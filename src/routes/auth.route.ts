import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

const authController = new AuthController();

router.post('/', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));

export default router;
