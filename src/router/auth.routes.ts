import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { loginValidator, refreshTokenValidator, tokenValidator } from './validators/auth.validator';

const router = Router();

router.post('/login', [loginValidator], AuthController.login);
router.post('/logout', [tokenValidator], AuthController.logout);
router.post('/refresh-token', [refreshTokenValidator], AuthController.refreshToken);

export default router;
