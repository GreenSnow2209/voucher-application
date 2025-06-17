import { EventModel, IEventDocument } from '../models/event.model';
import { IVoucherDocument, VoucherModel } from '../models/voucher.model';
import { v4 as uuidv4 } from 'uuid';
import BaseService from './base.service';
import { EventRepository } from '../repositories/event.repository';
import { emailQueue } from '../queues/bullQueue';
import mongoose from 'mongoose';
import { VoucherRepository } from '../repositories/voucher.repository';

const EDIT_TIMEOUT_MINUTES = 5;

export class EventService extends BaseService<IEventDocument> {
  private eventRepository: EventRepository;
  private voucherRepository: VoucherRepository;

  constructor() {
    const eventRepo = new EventRepository();
    super(eventRepo);
    this.eventRepository = eventRepo;
    this.voucherRepository = new VoucherRepository();
  }

  async requestEdit(eventId: string, userId: string): Promise<{ allowed: boolean } | null> {
    const event = await this.eventRepository.findById(eventId);
    console.log('user', userId);
    const now = new Date();
    if (!event) return null;

    if (
      event.editingBy &&
      event.editingBy !== userId &&
      event.editingExpiredAt &&
      event.editingExpiredAt > now
    ) {
      return { allowed: false };
    }

    event.editingBy = userId;
    event.editingExpiredAt = new Date(now.getTime() + EDIT_TIMEOUT_MINUTES * 60000);
    await this.eventRepository.update(eventId, event);

    return { allowed: true };
  }

  async releaseEdit(eventId: string, userId: string): Promise<void> {
    const event = await this.eventRepository.findById(eventId);
    if (event && event.editingBy === userId) {
      event.editingBy = '';
      event.editingExpiredAt = null;
      await this.eventRepository.update(eventId, event);
    }
  }

  async maintainEdit(eventId: string, userId: string): Promise<boolean> {
    const event = await this.eventRepository.findById(eventId);
    const now = new Date();
    if (!event || event.editingBy !== userId) return false;

    if (event.editingExpiredAt && event.editingExpiredAt > now) {
      event.editingExpiredAt = new Date(now.getTime() + EDIT_TIMEOUT_MINUTES * 60000);
      await this.eventRepository.update(eventId, event);
      return true;
    }

    return false;
  }
}
