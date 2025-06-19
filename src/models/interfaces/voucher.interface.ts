import { Document } from 'mongoose';

export interface IVoucher extends Document {
  id: string;
  title: string;
  description: string;
  code: string;
  userId: string;
  eventId: string;
  status: boolean;
  startDate: Date;
  expireDate: Date;
  value: number;
  isPercentage: boolean;
  issuedAt: Date;
  usedAt: Date;
}
