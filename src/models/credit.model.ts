import { Id, Model, RelationMappings } from 'objection';
import Base from './base';
import { User } from './user.model';

export class Credit extends Base {
  id!: Id;
  user_id!: number;
  balance!: number;

  static tableName = 'credit';

  static get relationMappings(): RelationMappings {
    return {
      userRelation: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join : {
          from: 'credit.user_id',
          to: 'user.id'
        }
      },
    };
  }
}