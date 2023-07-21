import { Id } from 'objection';
import Base from './base';
import { OperationType } from '../constants/operation.constant';

export class Operation extends Base {
  id!: Id;
  type!: OperationType;
  cost!: number;

  static tableName = 'operation';
}
