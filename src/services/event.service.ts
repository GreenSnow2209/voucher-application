import { IEventDocument } from '../models/event.model';
import BaseService from './base.service';
import { EventRepository } from '../repositories/event.repository';

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
