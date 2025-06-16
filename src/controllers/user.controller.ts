import { Request, Response } from "express";
import { UserService } from '../services/user.service'

const userService = new UserService();

export const UserController = {
  async getAllUser(req: Request, res: Response): Promise<void> {
    const users = await userService.findAll();
    res.json(users);
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await userService.findOne(req.params.id);
    res.json(user);
  },

  async createUser(req: Request, res: Response): Promise<void> {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  },

  async updateUser(req: Request, res: Response): Promise<void> {
    const user = await userService.update(req.params.id, req.body);
    res.json(user);
  },

  async removeUser(req: Request, res: Response): Promise<void> {
    await userService.remove(req.params.id);
    res.status(204).send();
  },
}
