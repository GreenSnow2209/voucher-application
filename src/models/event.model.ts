import mongoose, {Document, Model} from "mongoose";
import {IEvent} from "./interfaces/event.interface";

export type IEventDocument = IEvent & Document;

const EventSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    maxQuantity: {type: Number, required: true},
    editingBy: { type: String, default: null },
    editingExpiredAt: { type: Date, default: null },
}, {timestamps: true});
export const EventModel: Model<IEventDocument> = mongoose.model<IEventDocument>("Event", EventSchema);
