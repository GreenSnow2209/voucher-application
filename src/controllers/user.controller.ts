import { Request, Response } from "express";
import { UserService } from '../services/user.service'

const userService = new UserService();

export class UserController {
  static async findAll(req: Request, res: Response) {
    const users = await userService.findAll();
    res.json(users);
  }

  static async findOne(req: Request, res: Response) {
    const user = await userService.findOne(req.params.id);
    res.json(user);
  }

  static async create(req: Request, res: Response) {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  }

  static async update(req: Request, res: Response) {
    const user = await userService.update(req.params.id, req.body);
    res.json(user);
  }

  static async remove(req: Request, res: Response) {
    await userService.remove(req.params.id);
    res.status(204).send();
  }
}
