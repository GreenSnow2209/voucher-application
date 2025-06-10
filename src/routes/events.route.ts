import express from "express";
import { EventController } from "../controllers/events.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/', authMiddleware, EventController.findAll);
router.get('/:id', authMiddleware, EventController.findOne);
router.put('/:id', authMiddleware, EventController.update);
router.post('/', authMiddleware, EventController.create);
router.delete('/:id', authMiddleware, EventController.remove);

/**
 * @swagger
 * /api/events/request/{id}:
 *   post:
 *     summary: Request a new voucher by event ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to request a voucher for
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Voucher issued successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 eventId:
 *                   type: string
 *                 issuedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing or invalid event ID
 *       456:
 *         description: All vouchers issued
 *       500:
 *         description: Internal server error
 */
router.post('/request/:id', authMiddleware, EventController.requestVoucher);

export default router;
