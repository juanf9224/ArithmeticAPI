import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { loginValidator } from './validators/auth.validator';

const router = Router();

router.post('/login', [loginValidator], AuthController.login);

export default router;
