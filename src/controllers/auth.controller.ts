import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

const JWT_SECRET = process.env.JWT_SECRET || '123';

export const AuthController = {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const userService = new UserService();
      const user = await userService.validateLogin(email, password);
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async register(req: Request, res: Response): Promise<void> {
    const { email, password, name } = req.body;
    try {
      const userService = new UserService();
      const user = await userService.register(email, password, name);
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        res.status(201).json({ user });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
