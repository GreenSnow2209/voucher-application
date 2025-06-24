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

  requestVoucher = async (req: Request, res: Response): Promise<void> => {
    try {
      const eventId = req.params.id;
      const userId = (req.user as JwtPayload)?.id;
      const userEmail = (req.user as JwtPayload)?.email;

      const {
        title,
        description,
        startDate,
        expireDate,
        value,
        isPercentage,
        quantity = 1,
      } = req.body;

      const newVoucher = await this.voucherService.requestVoucher(
        eventId,
        userId,
        userEmail,
        {
          title,
          description,
          startDate,
          expireDate,
          value,
          isPercentage,
          quantity
        }
      );
      if (!newVoucher) {
        res.status(456).json({ message: 'Max quantity reached or failed to create voucher' });
        return;
      }

      res.status(200).json(newVoucher);
    } catch (err) {
      this._logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
