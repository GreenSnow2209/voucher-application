import express from 'express';
import { VoucherController } from '../controllers/voucher.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const controller = VoucherController.getInstance();

router.post('/request/:id', authMiddleware, controller.requestVoucher);

export default router;
