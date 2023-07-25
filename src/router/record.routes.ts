import { Router } from 'express';
import { RecordController } from '../controllers/record.controller';
import { getRecordValidator, listRecordsValidator, removeRecordValidator } from './validators/record.validator';
import { tokenValidator } from './validators/auth.validator';

const router = Router();
router.get('/:userId', [tokenValidator, listRecordsValidator], RecordController.list);
router.get('/:userId/:id', [tokenValidator, getRecordValidator], RecordController.getRecord);
router.delete('/:id', [tokenValidator, removeRecordValidator], RecordController.remove);

export default router;
