import express from "express";
import { UserController } from "../controllers/user.controller"
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/', authMiddleware, UserController.getAllUser);
router.get('/:id', authMiddleware, UserController.getUserById);
router.post('/', authMiddleware, UserController.createUser);
router.put('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.removeUser);

export default router;