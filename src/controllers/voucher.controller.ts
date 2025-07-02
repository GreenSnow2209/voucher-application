import { Request, Response } from 'express';
import { VoucherService } from '../services/voucher.service';
import { JwtPayload } from 'jsonwebtoken';
import { BaseController } from './base.controller';
import { emailQueue } from '../queues/bullQueue';
import { RES_MESSAGE, RES_STATUS } from '../utils/const';
import { sendMail } from '../utils/sendmail';

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

      const newVouchers = await this.voucherService.requestVoucher(
        eventId,
        userId,
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
      if (!newVouchers) {
        res.status(456).json({ message: 'Max quantity reached or failed to create voucher' });
        return;
      }

      const codes = newVouchers.map(voucher => voucher.code);
      await sendMail({
        to: userEmail,
        subject: `🎁 Your ${codes.length} Voucher Code${codes.length > 1 ? 's' : ''}`,
        template: 'voucher',
        context: {
          quantity: codes.length,
          plural: codes.length > 1 ? 's' : '',
          codes,
        },
      });

      res.status(200).json(newVouchers);
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).send({ message: RES_MESSAGE.INTERNAL_ERROR });
    }
  };
}
