import { Request, Response } from "express";
import { VoucherService } from '../services/voucher.service'

const voucherService = new VoucherService();

export class VoucherController {
  static async getAllVoucher(req: Request, res: Response) {
    const users = await voucherService.findAll();
    res.json(users);
  }

  static async getVoucherById(req: Request, res: Response) {
    const user = await voucherService.findOne(req.params.id);
    res.json(user);
  }

  static async createVoucher(req: Request, res: Response) {
    await voucherService.create(req.body);
    res.status(201).json(voucherService);
  }

  static async updateVoucher(req: Request, res: Response) {
    const user = await voucherService.update(req.params.id, req.body);
    res.json(user);
  }

  static async removeVoucher(req: Request, res: Response) {
    await voucherService.remove(req.params.id);
    res.status(204).send();
  }
}
