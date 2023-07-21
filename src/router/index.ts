import { Router } from 'express';

import userRouter from './user.routes';
import authRouter from './auth.routes';
import operationRoute from './operation.routes';
import { config } from '../config';

const router = Router();
router.use(`/${config.apiVersion}/user`, userRouter);
router.use(`/${config.apiVersion}/auth`, authRouter);
router.use(`/${config.apiVersion}/calculate`, operationRoute);

export default router;
