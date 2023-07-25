import { Knex } from 'knex';
import { User } from '../../models';

export const up = async (knex: Knex): Promise<void> => {
  const hasTable = await knex.schema.hasTable(User.tableName);
  if(!hasTable) {
    await knex.schema.createTable(User.tableName, (table: Knex.TableBuilder) => {
      table.increments();
      table.timestamps();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();    
      table.string('status').notNullable().defaultTo('active');    
    });
  } else {
    console.log('Table User already exists, skipping...');
  }
}

export const down = async (knex: Knex): Promise<void> => {
  const hasTable = await knex.schema.hasTable(User.tableName);
  if (hasTable) {
    knex.schema.dropTable(User.tableName)
  } else {
    console.log('Table User does not exist, skipping...');
  }
}
