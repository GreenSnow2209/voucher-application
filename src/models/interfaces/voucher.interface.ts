import { Document } from 'mongoose';

export interface IVoucher extends Document {
  id: string;
  code: string;
  userId: string;
  eventId: string;
  issuedAt: Date;
  usedAt: Date;
  isUsed: boolean;
  expiredAt: Date;
}
