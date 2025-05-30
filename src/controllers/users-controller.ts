import { Request, Response } from "express";

class UsersController {
  async getAll(req: Request, res: Response) {
    res.json(['Hello World!']);
  }

  async findOne(req: Request, res: Response) {
    res.json([]);
  }

  async create(req: Request, res: Response) {
    res.json([]);
  }

  async update(req: Request, res: Response) {
    res.json([]);
  }

  async remove(req: Request, res: Response) {
    res.json([]);
  }
}

export default new UsersController();
