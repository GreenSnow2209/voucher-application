import {Request, Response} from 'express';
import {EventService} from '../services/events.services';
import {JwtPayload} from "jsonwebtoken";

const eventService = new EventService();

export class EventController {
    static async findAll(req: Request, res: Response) {
        const events = await eventService.findAll();
        res.json(events);
    }

    static async findOne(req: Request, res: Response) {
        const event = await eventService.findOne(req.params.id);
        res.json(event);
    }

    static async create(req: Request, res: Response) {
        const event = await eventService.create(req.body);
        res.status(201).json(event);
    }

    static async update(req: Request, res: Response) {
        const event = await eventService.update(req.params.id, req.body);
        res.json(event);
    }

    static async remove(req: Request, res: Response) {
        await eventService.remove(req.params.id);
        res.status(204).send();
    }

    static async requestVoucher(req: Request, res: Response) {
        const eventId = req.params.id;
        const userId = (req.user as JwtPayload)?.id;
        const newVoucher = await eventService.requestVoucher(eventId, userId);
        res.status(204).json(newVoucher);
    }
}
