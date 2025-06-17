import express from 'express';
import { EventController } from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const controller = EventController.getInstance();

router.get('/', authMiddleware, controller.getAllEvent);
router.get('/:id', authMiddleware, controller.getEventById);
router.post('/', authMiddleware, controller.createEvent);
router.put('/:id', authMiddleware, controller.updateEvent);
router.delete('/:id', authMiddleware, controller.removeEvent);

router.post('/:id/editable/me', authMiddleware, controller.requestEdit);
router.post('/:id/editable/release', authMiddleware, controller.releaseEdit);
router.post('/:id/editable/maintain', authMiddleware, controller.maintainEdit);

export default router;
