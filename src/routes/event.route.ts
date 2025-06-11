import express from "express";
import { EventController } from "../controllers/event.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/', authMiddleware, EventController.getAllEvent);
router.get('/:id', authMiddleware, EventController.getEventById);
router.post('/', authMiddleware, EventController.createEvent);
router.put('/:id', authMiddleware, EventController.updateEvent);
router.delete('/:id', authMiddleware, EventController.removeEvent);

router.post('/request/:id', authMiddleware, EventController.requestVoucher);
router.post('/:id/editable/me', authMiddleware, EventController.requestEdit);
router.post('/:id/editable/release', authMiddleware, EventController.releaseEdit);
router.post('/:id/editable/maintain', authMiddleware, EventController.maintainEdit);

export default router;
