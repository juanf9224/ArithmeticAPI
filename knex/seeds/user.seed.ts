import { Knex } from 'knex';
import { User } from '../../src/models';

const now = new Date();

const users = [
  {
    id: 1,
    username: 'john.doe@mail.com',
    password: '',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: 'doe.john@mail.com',
    password: '',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: 'doe.doe@mail.com',
    password: '',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
];

export const seed = async (knex: Knex): Promise<void> => {
  await knex(User.tableName).del();
  await knex(User.tableName).insert(users);
};
