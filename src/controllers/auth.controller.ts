import { Request, Response } from 'express';
import { UserModel } from "../models/users.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '123';

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                res.status(401).json({ error: 'Invalid email or password' });
            } else {
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({ token });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}