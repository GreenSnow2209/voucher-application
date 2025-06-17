import { Request, Response } from 'express';
import { EventService } from '../services/event.service';
import { JwtPayload } from 'jsonwebtoken';
import { BaseController } from './base.controller';

const eventService = new EventService();

export class EventController extends BaseController {
  private static _instance: EventController;
  private eventService: EventService;

  constructor() {
    super();
    this.eventService = new EventService();
  }

  public static getInstance(): EventController {
    if (!this._instance) {
      this._instance = new EventController();
    }
    return this._instance;
  }

  async getAllEvent(req: Request, res: Response): Promise<void> {
    try {
      const events = await this.eventService.findAll();
      res.json(events);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const event = await eventService.findOne(req.params.id);
      res.json(event);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = await eventService.create(req.body);
      res.status(201).json(event);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = await eventService.update(req.params.id, req.body);
      res.json(event);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async removeEvent(req: Request, res: Response): Promise<void> {
    try {
      await eventService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async requestEdit(req: Request, res: Response): Promise<void> {
    try {
      let code = 200;
      let mess = 'Edit permission granted';
      const eventId = req.params.id;
      const userId = (req.user as JwtPayload)?.id;
      const result = await eventService.requestEdit(eventId, userId);
      if (!result) {
        code = 404;
        mess = 'Event not found';
      } else if (!result.allowed) {
        code = 409;
        mess = 'Event is being edited by another user';
      }
      res.status(code).send(mess);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async releaseEdit(req: Request, res: Response): Promise<void> {
    try {
      const eventId = req.params.id;
      const userId = (req.user as JwtPayload)?.id;

      await eventService.releaseEdit(eventId, userId);
      res.status(200).send('Released');
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async maintainEdit(req: Request, res: Response): Promise<void> {
    try {
      let code = 200;
      let mess = 'Edit session extended';
      const eventId = req.params.id;
      const userId = (req.user as JwtPayload)?.id;
      const extended = await eventService.maintainEdit(eventId, userId);
      if (!extended) {
        code = 403;
        mess = 'Edit session invalid';
      }
      res.status(code).send(mess);
    } catch (err) {
      this.logger(err, 'error');
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
