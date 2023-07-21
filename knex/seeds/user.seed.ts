import { Knex } from 'knex';
import { User } from '../../src/models';
import { hashPassword } from '../../src/helpers/passwords';

const now = new Date();

const users = [
  {
    id: 1,
    username: 'john.doe@mail.com',
    password: 'Password.123',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: 'doe.john@mail.com',
    password: 'Password.1234',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: 'doe.doe@mail.com',
    password: 'Password.1235',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
];

export const seed = async (knex: Knex): Promise<void> => {
  const withHashedPassword = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await hashPassword(user.password)
    }))
  );
  await knex(User.tableName).del();
  await knex(User.tableName).insert(withHashedPassword);
};
