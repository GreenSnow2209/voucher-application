import express from "express";
import { VoucherController } from '../controllers/voucher.controller';
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/', authMiddleware, VoucherController.getAllVoucher);
router.get('/:id', authMiddleware, VoucherController.getVoucherById);
router.post('/', authMiddleware, VoucherController.createVoucher);
router.put('/:id', authMiddleware, VoucherController.updateVoucher);
router.delete('/:id', authMiddleware, VoucherController.removeVoucher);

export default router;