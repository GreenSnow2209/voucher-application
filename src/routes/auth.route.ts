import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../validations/auth.validation';

const router = express.Router();

const authController = new AuthController();

router.post('/', validateBody(loginSchema), authController.login);
router.post('/register', validateBody(registerSchema), authController.register);

export default router;
