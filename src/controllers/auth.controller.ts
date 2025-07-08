import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import { BaseController } from './base.controller';
import { appConfig } from '../config/app.config';
import { RES_MESSAGE, RES_STATUS } from '../utils/const';

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
        res.status(RES_STATUS.UNAUTHORIZED).json({ 
          error: 'Invalid email or password' 
        });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        appConfig.jwtSecret, 
        { expiresIn: '1h' }
      );
      
      res.status(RES_STATUS.OK).json({ 
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ 
        message: RES_MESSAGE.INTERNAL_ERROR 
      });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;
    try {
      const user = await this.userService.register(email, password, name);
      if (!user) {
        res.status(RES_STATUS.CONFLICT).json({ 
          error: 'User with this email already exists' 
        });
        return;
      }

      res.status(RES_STATUS.CREATED).json({ 
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ 
        message: RES_MESSAGE.INTERNAL_ERROR 
      });
    }
  }
}
