import express from 'express';
import { VoucherController } from '../controllers/voucher.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const voucherController = new VoucherController();

router.post('/request/:id', authMiddleware, voucherController.requestVoucher);

export default router;
