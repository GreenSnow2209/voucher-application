import { IEventDocument } from '../models/event.model';
import BaseService from './base.service';
import { EventRepository } from '../repositories/event.repository';
import { logger } from '../utils/logger';

const EDIT_TIMEOUT_MINUTES = 5;

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
    event.editingExpiredAt = new Date(now.getTime() + EDIT_TIMEOUT_MINUTES * 60000);
    await this.eventRepository.update(eventId, event);

    return { allowed: true };
  }

  async releaseEdit(eventId: string, userId: string, data: Partial<IEventDocument>): Promise<IEventDocument | null> {
    const event = await this.eventRepository.findById(eventId);
    //missing time
    if (event && event.editingBy === userId) {
      return await this.update(eventId, {
        ...data,
        editingBy: '',
        editingExpiredAt: null,
      });
    }
    return null;
  }

  async maintainEdit(eventId: string, userId: string): Promise<boolean> {
    const event = await this.eventRepository.findById(eventId);
    const now = new Date();
    if (!event || event.editingBy !== userId) {
      return false;
    }

    if (event.editingExpiredAt && event.editingExpiredAt > now) {
      event.editingExpiredAt = new Date(now.getTime() + EDIT_TIMEOUT_MINUTES * 60000);
      await this.eventRepository.update(eventId, event);
      return true;
    }

    return false;
  }
}
