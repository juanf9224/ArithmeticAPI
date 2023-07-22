import { Router } from 'express';
import { RecordController } from '../controllers/record.controller';
import { getRecordValidator, listRecordsValidator } from './validators/record.validator';

const router = Router();

router.get('/:userId', [listRecordsValidator], RecordController.list);
router.get('/:userId/:id', [getRecordValidator], RecordController.getRecord);

export default router;
