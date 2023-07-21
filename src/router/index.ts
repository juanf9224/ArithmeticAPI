import { Router } from 'express';

import userRouter from './user.routes';
import { config } from '../config';

const router = Router();
router.use(`/${config.apiVersion}/user`, userRouter);

export default router;
