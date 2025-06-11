import mongoose, {Document, Model} from "mongoose";
import {IEvent} from "./interfaces/event.interface";

export type IEventDocument = IEvent & Document;

const EventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    maxQuantity: {type: Number, required: true},
}, {timestamps: true});
export const EventModel: Model<IEventDocument> = mongoose.model<IEventDocument>("Event", EventSchema);