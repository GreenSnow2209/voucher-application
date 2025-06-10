import express from "express";
import { VoucherController } from '../controllers/vouchers.controller';
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/', authMiddleware, VoucherController.findAll);
router.get('/:id', authMiddleware, VoucherController.findOne);
router.put('/:id', authMiddleware, VoucherController.update);
router.post('/', authMiddleware, VoucherController.create);
router.delete('/:id', authMiddleware, VoucherController.remove);

export default router;