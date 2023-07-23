import { Knex } from 'knex';
import { User } from '../../models';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(User.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();    
    table.string('status').notNullable().defaultTo('active');    
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(User.tableName);
