import { OperationType } from '../../constants/operation.constant';
import { Knex } from 'knex';
import { Operation } from '../../models';

const now = new Date();

const operations = [
  {
    id: 1,
    type: OperationType.ADDITION,
    cost: 10,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    type: OperationType.SUBSTRACTION,
    cost: 10,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    type: OperationType.MULTIPLICATION,
    cost: 15,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    type: OperationType.DIVISION,
    cost: 20,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 5,
    type: OperationType.SQUARE_ROOT,
    cost: 35,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 6,
    type: OperationType.RANDOM_STRING,
    cost: 50,
    createdAt: now,
    updatedAt: now,
  },
];

export const seed = async (knex: Knex): Promise<void> => {
  await knex(Operation.tableName).del();
  await knex(Operation.tableName).insert(operations);
};
