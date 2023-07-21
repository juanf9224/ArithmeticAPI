import { Knex } from 'knex';
import { User } from '../../src/models';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(User.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('username').notNullable();
    table.string('password').notNullable();    
    table.string('status').notNullable().defaultTo('active');    
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(User.tableName);
