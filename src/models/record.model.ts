import { Id, Model, RelationMappings } from 'objection';
import Base from './base';
import { User } from './user.model';
import { Operation } from './operation.model';

export class Record extends Base {
  id!: Id;
  user_id!: number;
  operation_id!: number;
  amount!: number;
  userBalance!: number;
  operationResponse!: string | number;
  date!: Date;
  deleted!: boolean;

  static tableName = 'record';

  static get relationMappings(): RelationMappings {
    return {
      userRelation: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join : {
          from: 'record.user_id',
          to: 'user.id'
        }
      },
      operationRelation: {
        relation: Model.HasOneRelation,
        modelClass: Operation,
        join : {
          from: 'record.operation_id',
          to: 'operation.id'
        }
      }
    };
  }
}
