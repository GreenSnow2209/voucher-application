import {Request, Response} from 'express';
import {EventService} from '../services/event.service';
import {JwtPayload} from "jsonwebtoken";

const eventService = new EventService();

export const EventController = {
    async getAllEvent(req: Request, res: Response): Promise<void> {
        const events = await eventService.findAll();
        res.json(events);
    },

    async getEventById(req: Request, res: Response): Promise<void> {
        const event = await eventService.findOne(req.params.id);
        res.json(event);
    },

    async createEvent(req: Request, res: Response): Promise<void> {
        const event = await eventService.create(req.body);
        res.status(201).json(event);
    },

    async updateEvent(req: Request, res: Response): Promise<void> {
        const event = await eventService.update(req.params.id, req.body);
        res.json(event);
    },

    async removeEvent(req: Request, res: Response): Promise<void> {
        await eventService.remove(req.params.id);
        res.status(204).send();
    },

    async requestVoucher(req: Request, res: Response): Promise<void> {
        const eventId = req.params.id;
        const userId = (req.user as JwtPayload)?.id;
        const newVoucher = await eventService.requestVoucher(eventId, userId);
        res.status(200).json(newVoucher);
    },

    async requestEdit(req: Request, res: Response): Promise<void> {
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
    },

    async releaseEdit(req: Request, res: Response): Promise<void> {
        const eventId = req.params.id;
        const userId = (req.user as JwtPayload)?.id;

        await eventService.releaseEdit(eventId, userId);
        res.status(200).send('Released');
    },

    async maintainEdit(req: Request, res: Response): Promise<void> {
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
    },
}
