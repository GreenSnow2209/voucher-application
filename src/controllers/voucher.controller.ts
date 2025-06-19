import { Request, Response } from 'express';
import { VoucherService } from '../services/voucher.service';
import { JwtPayload } from 'jsonwebtoken';
import { BaseController } from './base.controller';

export class VoucherController extends BaseController {
  protected voucherService: VoucherService;

  constructor() {
    super();
    this.voucherService = VoucherService.getInstance();
  }

  public requestVoucher = async (req: Request, res: Response): Promise<void> => {
    try {
      const eventId = req.params.id;
      const userId = (req.user as JwtPayload)?.id;
      const newVoucher = await this.voucherService.requestVoucher(eventId, userId);
      res.status(200).json(newVoucher);
    } catch (err) {
      this._logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
