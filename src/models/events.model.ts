import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  maxQuantity: { type: Number, required: true },
}, { timestamps: true });
export const EventModel = mongoose.model("Event", EventSchema);