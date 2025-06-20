import express from 'express';
import { EventController } from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const eventController = new EventController();

router.get('/', authMiddleware, eventController.getAllEvent);
router.get('/:id', authMiddleware, eventController.getEventById);
router.post('/', authMiddleware, eventController.createEvent);
router.put('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.removeEvent);

router.post('/:id/editable/me', authMiddleware, eventController.requestEdit);
router.post('/:id/editable/release', authMiddleware, eventController.releaseEdit);
router.post('/:id/editable/maintain', authMiddleware, eventController.maintainEdit);

export default router;
