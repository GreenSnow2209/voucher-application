import express from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const controller = UserController.getInstance();

router.get('/', authMiddleware, controller.getAllUser);
router.get('/:id', authMiddleware, controller.getUserById);
router.post('/', authMiddleware, controller.createUser);
router.put('/:id', authMiddleware, controller.updateUser);
router.delete('/:id', authMiddleware, controller.removeUser);

export default router;
