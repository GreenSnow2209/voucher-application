import BaseRepository from "./base.repository";
import {IVoucherDocument, VoucherModel} from "../models/voucher.model";

export class VoucherRepository extends BaseRepository<IVoucherDocument> {
    constructor() {
        super(VoucherModel);
    }
}