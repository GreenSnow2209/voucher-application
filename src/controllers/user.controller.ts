import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { BaseController } from './base.controller';

const userService = new UserService();

export class UserController extends BaseController {
  private static _instance: UserController;
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  public static getInstance(): UserController {
    if (!this._instance) {
      this._instance = new UserController();
    }
    return this._instance;
  }

  async getAllUser(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.findOne(req.params.id);
      res.json(user);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async removeUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
