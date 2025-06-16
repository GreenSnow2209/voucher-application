import mongoose, {Document, Model} from "mongoose";
import {IVoucher} from "./interfaces/voucher.interface";

export type IVoucherDocument = IVoucher & Document

const VoucherSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    eventId: {type: String, required: true},
    issuedAt: {type: Date, default: Date.now},
    usedAt: {type: Date, default: null},
    isUsed: {type: Boolean, default: false},
    expiredAt: {type: Date},
}, {timestamps: true});
export const VoucherModel: Model<IVoucherDocument> = mongoose.model<IVoucherDocument>("Voucher", VoucherSchema);
