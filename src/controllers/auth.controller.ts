import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import { BaseController } from './base.controller';
import { appConfig } from '../config/app.config';

export class AuthController extends BaseController {
  protected userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await this.userService.validateLogin(email, password);
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        const token = jwt.sign({ id: user.id, email: user.email }, appConfig.jwtSecret, {
          expiresIn: '1h',
        });
        res.json({ token });
      }
    } catch (err) {
      this._logger(err, 'error');
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;
    try {
      const user = await this.userService.register(email, password, name);
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        res.status(201).json({ user });
      }
    } catch (err) {
      this._logger(err, 'error');
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
