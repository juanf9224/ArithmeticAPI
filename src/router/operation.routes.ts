import { Router } from 'express';
import { OperationController } from '../controllers/operation.controller';
import { calculateValidator } from './validators/operation.validator';
import { tokenValidator } from './validators/auth.validator';

const router = Router();
router.post('/:userId/calculate', [tokenValidator, calculateValidator], OperationController.calculate)
router.get('/', [tokenValidator], OperationController.list)
export default router;
