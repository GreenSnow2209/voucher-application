import {EventModel, IEventDocument} from "../models/event.model";
import {VoucherModel} from "../models/voucher.model";
import {v4 as uuidv4} from "uuid";
import BaseService from "./base.service";
import {EventRepository} from "../repositories/event.repository";

const EDIT_TIMEOUT_MINUTES = 5;

export class EventService extends BaseService<IEventDocument> {
    private eventRepository: EventRepository;

    constructor() {
        const eventRepo = new EventRepository();
        super(eventRepo);
        this.eventRepository = eventRepo;
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

    async requestEdit(eventId: string, userId: string) {
        const event = await EventModel.findById(eventId);
        const now = new Date();

        if (!event) return null;

        if (
            event.editingBy &&
            event.editingBy !== userId &&
            event.editingExpiredAt &&
            event.editingExpiredAt > now
        ) {
            return {allowed: false};
        }

        event.editingBy = userId;
        event.editingExpiredAt = new Date(now.getTime() + EDIT_TIMEOUT_MINUTES * 60000);
        await event.save();

        return {allowed: true};
    }

    async releaseEdit(eventId: string, userId: string) {
        const event = await this.eventRepository.findById(eventId);
        if (event && event.editingBy === userId) {
            event.editingBy = '';
            event.editingExpiredAt = null;
            await event.save();
        }
    }

    async maintainEdit(eventId: string, userId: string) {
        const event = await EventModel.findById(eventId);
        const now = new Date();

        if (!event || event.editingBy !== userId) return false;

        if (event.editingExpiredAt && event.editingExpiredAt > now) {
            event.editingExpiredAt = new Date(now.getTime() + EDIT_TIMEOUT_MINUTES * 60000);
            await event.save();
            return true;
        }

        return false;
    }
}