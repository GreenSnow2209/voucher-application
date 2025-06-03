import express from "express";
import { VoucherController } from '../controllers/vouchers-controller';

const router = express.Router();

router.get('/', VoucherController.findAll);
router.get('/:id', VoucherController.findOne);
router.put('/:id', VoucherController.update);
router.post('/', VoucherController.create);
router.delete('/:id', VoucherController.remove);

export default router;