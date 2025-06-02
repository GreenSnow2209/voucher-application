import express from "express";
import { UserController } from "../controllers/users-controller"

const router = express.Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.put('/:id', UserController.update);
router.post('/', UserController.create);
router.delete('/:id', UserController.remove);

export default router;