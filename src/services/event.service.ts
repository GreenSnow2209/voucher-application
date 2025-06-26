import { IEventDocument } from '../models/event.model';
import BaseService from './base.service';
import { EventRepository } from '../repositories/event.repository';
import { EVENT_CONST } from '../utils/const';

export class EventService extends BaseService<IEventDocument> {
  protected static instance: EventService;
  protected eventRepository: EventRepository;

  public static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  constructor() {
    const eventRepo = new EventRepository();
    super(eventRepo);
    this.eventRepository = eventRepo;
  }

  async checkPermissionAndUpdate(eventId: string, userId: string, data: Partial<IEventDocument>): Promise<IEventDocument | null> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      return null;
    }
    const now = new Date();
    if (event.editingBy !== userId || !event.editingExpiredAt || event.editingExpiredAt < now) {
      return null;
    }
    return this.eventRepository.update(eventId, data);
  }

  async requestEdit(eventId: string, userId: string): Promise<{ allowed: boolean } | null> {
    const event = await this.eventRepository.findById(eventId);
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
    event.editingExpiredAt = new Date(now.getTime() + EVENT_CONST.EXPIRE_TIME);
    await this.eventRepository.update(eventId, event);

    return { allowed: true };
  }

  async releaseEdit(eventId: string, userId: string): Promise<IEventDocument | null> {
    const event = await this.eventRepository.findById(eventId);
    const now = new Date();
    if (!event || event.editingBy !== userId || !event.editingExpiredAt  || event.editingExpiredAt < now) {
      return null;
    }
    return await this.update(eventId, {
      editingBy: '',
      editingExpiredAt: null,
    });
  }

  async maintainEdit(eventId: string, userId: string): Promise<boolean> {
    const event = await this.eventRepository.findById(eventId);
    const now = new Date();
    if (!event || event.editingBy !== userId) {
      return false;
    }

    if (event.editingExpiredAt && event.editingExpiredAt > now) {
      event.editingExpiredAt = new Date(now.getTime() + EVENT_CONST.EXPIRE_TIME);
      await this.eventRepository.update(eventId, event);
      return true;
    }

    return false;
  }
}
