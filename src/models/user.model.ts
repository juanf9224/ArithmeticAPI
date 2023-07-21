import { Id } from 'objection';
import Base from './base';

export class User extends Base {
  id!: Id;
  username!: string;
  password!: string;
  status!: string;

  static tableName = 'user';
}
