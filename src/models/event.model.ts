import mongoose, { Document, Model } from 'mongoose';
import { IEvent } from './interfaces/event.interface';

export type IEventDocument = IEvent & Document;

const EventSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    editingBy: { type: String, default: null },
    editingExpiredAt: { type: Date, default: null },
  },
  { timestamps: true },
);
export const EventModel: Model<IEventDocument> = mongoose.model<IEventDocument>(
  'Event',
  EventSchema,
);
