import express from 'express';
import { EventController } from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const eventController = new EventController();

router.get('/', authMiddleware, eventController.getAllEvent.bind(eventController));
router.get('/:id', authMiddleware, eventController.getEventById.bind(eventController));
router.post('/', authMiddleware, eventController.createEvent.bind(eventController));
router.put('/:id', authMiddleware, eventController.updateEvent.bind(eventController));
router.delete('/:id', authMiddleware, eventController.removeEvent.bind(eventController));

router.post('/:id/editable/me', authMiddleware, eventController.requestEdit.bind(eventController));
router.post('/:id/editable/release', authMiddleware, eventController.releaseEdit.bind(eventController));
router.post('/:id/editable/maintain', authMiddleware, eventController.maintainEdit.bind(eventController));

export default router;
