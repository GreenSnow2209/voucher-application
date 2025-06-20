import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = UserService.getInstance();
  }

  getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (err) {
      this._logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.findOne(req.params.id);
      res.json(user);
    } catch (err) {
      this._logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      this._logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      this._logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  removeUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      this._logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
