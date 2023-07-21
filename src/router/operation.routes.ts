import { Router } from 'express';
import { OperationController } from '../controllers/operation.controller';
import { calculateValidator } from './validators/operation.validator';

const router = Router();
router.post('/:userId', OperationController.calculate)
export default router;
