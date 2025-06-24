import BaseRepository from './base.repository';
import { IVoucherDocument, VoucherModel } from '../models/voucher.model';
import { ClientSession } from 'mongoose';

export class VoucherRepository extends BaseRepository<IVoucherDocument> {
  constructor() {
    super(VoucherModel);
  }

  async countByEventId(eventId: string): Promise<number> {
    return this.model.countDocuments({ id: eventId });
  }

  async insertMany(vouchers: Partial<IVoucherDocument>[], session?: ClientSession): Promise<IVoucherDocument[]> {
    return this.model.insertMany(vouchers, { session });
  }
}
