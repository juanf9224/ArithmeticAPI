import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { tokenValidator } from './validators/auth.validator';

const router = Router();

router.get('/', [tokenValidator], UserController.list)
router.get('/:id', [tokenValidator], UserController.getUser)
router.post('/', [tokenValidator], UserController.create)
router.put('/:id', [tokenValidator], UserController.update)
router.delete('/:id', [tokenValidator], UserController.remove)

export default router;
