import {IVoucherDocument} from "../models/voucher.model";
import BaseService from "./base.service";
import {VoucherRepository} from "../repositories/voucher.repository";

export class VoucherService extends BaseService<IVoucherDocument> {
    private voucherRepository: VoucherRepository;

    constructor() {
        const voucherRepo = new VoucherRepository();
        super(voucherRepo);
        this.voucherRepository = voucherRepo;
    }
}