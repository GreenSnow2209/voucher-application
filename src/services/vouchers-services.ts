import { VoucherModel } from "../models/vouchers";

export class VoucherService {
    async findAll() {
        return await VoucherModel.find();
    }

    async findOne(id: string) {
        return await VoucherModel.findById(id);
    }

    async create(data: any) {
        return await VoucherModel.create(data);
    }

    async update(id: string, data: any) {
        return await VoucherModel.findByIdAndUpdate(id, data, { new: true });
    }

    async remove(id: string) {
        return await VoucherModel.findByIdAndDelete(id);
    }
}