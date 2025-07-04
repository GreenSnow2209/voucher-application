import { Request, Response } from 'express';
import { EventService } from '../services/event.service';
import { JwtPayload } from 'jsonwebtoken';
import { BaseController } from './base.controller';
import { RES_MESSAGE, RES_STATUS } from '../utils/const';

const eventService = new EventService();

export class EventController extends BaseController {
  private eventService: EventService;

  constructor() {
    super();
    this.eventService = EventService.getInstance();
  }

  getAllEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const events = await this.eventService.findAll();
      res.status(RES_STATUS.OK).json(events);
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ message: RES_MESSAGE.INTERNAL_ERROR });
    }
  };

  getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await eventService.findOne(req.params.id);
      res.status(RES_STATUS.OK).json(event);
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ message: RES_MESSAGE.INTERNAL_ERROR });
    }
  };

  createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await eventService.create(req.body);
      res.status(RES_STATUS.CREATED).json(event);
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ message: RES_MESSAGE.INTERNAL_ERROR });
    }
  };

  updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req.user as JwtPayload)?.id;
      const event = await eventService.checkPermissionAndUpdate(req.params.id, userId, req.body);
      res.status(RES_STATUS.OK).json(event);
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ message: RES_MESSAGE.INTERNAL_ERROR });
    }
  };

  removeEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      await eventService.remove(req.params.id);
      res.status(RES_STATUS.NO_CONTENT).send();
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ message: RES_MESSAGE.INTERNAL_ERROR });
    }
  };

  requestEdit = async (req: Request, res: Response): Promise<void> => {
    try {
      const eventId = req.params.id;
      const userId = (req.user as JwtPayload)?.id;
      const result = await eventService.requestEdit(eventId, userId);
      if (!result) {
        res.status(RES_STATUS.NOT_FOUND).send({ message: RES_MESSAGE.EVENT_NOT_FOUND});
        return;
      } else if (!result.allowed) {
        res.status(RES_STATUS.CONFLICT).send({ message: RES_MESSAGE.EDIT_CONFLICT});
        return;
      }
      res.status(RES_STATUS.OK).send({ message: RES_MESSAGE.EDIT_GRANTED });
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ message: RES_MESSAGE.INTERNAL_ERROR });
    }
  };

  releaseEdit = async (req: Request, res: Response): Promise<void> => {
    try {
      const eventId = req.params.id;
      const userId = (req.user as JwtPayload)?.id;
      const event = await eventService.releaseEdit(eventId, userId);
      if (!event) {
        res.status(RES_STATUS.CONFLICT).send({ message: RES_MESSAGE.EDIT_CONFLICT});
        return;
      }
      res.status(RES_STATUS.OK).send(event);
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ message: RES_MESSAGE.INTERNAL_ERROR });
    }
  };

  maintainEdit = async (req: Request, res: Response): Promise<void> => {
    try {
      const eventId = req.params.id;
      const userId = (req.user as JwtPayload)?.id;
      const extended = await eventService.maintainEdit(eventId, userId);
      if (!extended) {
        res.status(RES_STATUS.FORBIDDEN).send({ message: RES_MESSAGE.EDIT_INVALID });
        return;
      }
      res.status(RES_STATUS.OK).send({ message: RES_MESSAGE.EDIT_EXTENDED });
    } catch (err) {
      this._logger(err, 'error');
      res.status(RES_STATUS.SERVER_ERROR).json({ message: RES_MESSAGE.INTERNAL_ERROR });
    }
  };
}
