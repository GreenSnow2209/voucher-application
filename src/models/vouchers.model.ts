import mongoose from "mongoose";

const VoucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  issuedAt: { type: Date, default: Date.now },
  usedAt: { type: Date, default: null },
  isUsed: { type: Boolean, default: false },
  expiredAt: { type: Date },
}, { timestamps: true });
export const VoucherModel = mongoose.model("Voucher", VoucherSchema);