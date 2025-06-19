import mongoose, { Document, Model } from 'mongoose';
import { IVoucher } from './interfaces/voucher.interface';

export type IVoucherDocument = IVoucher & Document;

const VoucherSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    code: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    eventId: { type: String, required: true },
    status: { type: Boolean, default: true },
    startDate: { type: Date, required: true },
    expireDate: { type: Date, default: null },
    value: { type: Number, required: true },
    isPercentage: { type: Boolean, default: false },
    issuedAt: { type: Date, default: Date.now },
    usedAt: { type: Date, default: null },
  },
  { timestamps: true },
);
export const VoucherModel: Model<IVoucherDocument> = mongoose.model<IVoucherDocument>(
  'Voucher',
  VoucherSchema,
);
