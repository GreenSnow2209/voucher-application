import express from 'express';
import { VoucherController } from '../controllers/voucher.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { voucherRequestSchema } from '../validations/voucher.validation';

const router = express.Router();
const voucherController = new VoucherController();

router.post('/request/:id', authMiddleware, validateBody(voucherRequestSchema), voucherController.requestVoucher);

export default router;
