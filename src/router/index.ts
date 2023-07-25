import { Router } from 'express';

import userRouter from './user.routes';
import authRouter from './auth.routes';
import operationRoute from './operation.routes';
import recordsRoute from './record.routes';
import { config } from '../config';

const router = Router();
router.use(`/api/${config.apiVersion}/user`, userRouter);
router.use(`/api/${config.apiVersion}/auth`, authRouter);
router.use(`/api/${config.apiVersion}/operations`, operationRoute);
router.use(`/api/${config.apiVersion}/records`, recordsRoute);

export default router;
