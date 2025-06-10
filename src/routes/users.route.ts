import express from "express";
import { UserController } from "../controllers/users.controller"
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/', authMiddleware, UserController.findAll);
router.get('/:id', authMiddleware, UserController.findOne);
router.put('/:id', authMiddleware, UserController.update);
router.post('/', authMiddleware, UserController.create);
router.delete('/:id', authMiddleware, UserController.remove);

export default router;