import { Request, Response } from "express";
import { VoucherService } from '../services/voucher.service'

const voucherService = new VoucherService();

export const VoucherController = {
  async getAllVoucher(req: Request, res: Response): Promise<void> {
    const users = await voucherService.findAll();
    res.json(users);
  },

  async getVoucherById(req: Request, res: Response): Promise<void> {
    const user = await voucherService.findOne(req.params.id);
    res.json(user);
  },

  async createVoucher(req: Request, res: Response): Promise<void> {
    await voucherService.create(req.body);
    res.status(201).json(voucherService);
  },

  async updateVoucher(req: Request, res: Response): Promise<void> {
    const user = await voucherService.update(req.params.id, req.body);
    res.json(user);
  },

  async removeVoucher(req: Request, res: Response): Promise<void> {
    await voucherService.remove(req.params.id);
    res.status(204).send();
  },
}
