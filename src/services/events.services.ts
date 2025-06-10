import {EventModel} from "../models/events.model";
import {VoucherModel} from "../models/vouchers.model";
import {v4 as uuidv4} from "uuid";

export class EventService {
    async findAll() {
        return await EventModel.find();
    }

    async findOne(id: string) {
        return await EventModel.findById(id);
    }

    async create(data: any) {
        return await EventModel.create(data);
    }

    async update(id: string, data: any) {
        return await EventModel.findByIdAndUpdate(id, data, { new: true });
    }

    async remove(id: string) {
        return await EventModel.findByIdAndDelete(id);
    }

    async requestVoucher(eventId: string, userId: string) {
        const event = await EventModel.findById(eventId);
        if (!event) {
            return null;
        }
        const issuedCount = await VoucherModel.countDocuments({eventId});
        if (issuedCount >= event.maxQuantity) {
            return null;
        }

        const voucherCode = uuidv4().toUpperCase();
        return await VoucherModel.create({
            code: voucherCode,
            eventId: event._id,
            userId: userId,
            issuedAt: new Date(),
        });
    }
}