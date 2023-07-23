import { Knex } from 'knex';
import { Record } from '../../src/models';

const now = new Date();

const records: Partial<Record>[] = [
  {
    id: 1,
    user_id: 1,
    operation_id: 1,
    userBalance: 200,
    amount: 10,
    operationResponse: 50,
    date: now,
  },
  {
    id: 2,
    user_id: 2,
    operation_id: 1,
    userBalance: 50,
    amount: 10,
    operationResponse: 20,
    date: now,
  },
  {
    id: 3,
    user_id: 3,
    operation_id: 1,
    userBalance: 100,
    amount: 10,
    operationResponse: 10,
    date: now,
  },
  {
    id: 4,
    user_id: 3,
    operation_id: 1,
    userBalance: 100,
    amount: 50,
    operationResponse: 'asfgdasdf',
    date: now,
  },
];

export const seed = async (knex: Knex): Promise<void> => {
  await knex(Record.tableName).del();
  await knex(Record.tableName).insert(records);
};