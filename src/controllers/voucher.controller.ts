import { Request, Response } from "express";
import { VoucherService } from '../services/voucher.service'

const voucherService = new VoucherService();

export class VoucherController {
  static async findAll(req: Request, res: Response) {
    const users = await voucherService.findAll();
    res.json(users);
  }

  static async findOne(req: Request, res: Response) {
    const user = await voucherService.findOne(req.params.id);
    res.json(user);
  }

  static async create(req: Request, res: Response) {
    const user = await voucherService.create(req.body);
    res.status(201).json(voucherService);
  }

  static async update(req: Request, res: Response) {
    const user = await voucherService.update(req.params.id, req.body);
    res.json(user);
  }

  static async remove(req: Request, res: Response) {
    await voucherService.remove(req.params.id);
    res.status(204).send();
  }
}
