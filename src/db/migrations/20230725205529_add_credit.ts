import { Knex } from 'knex';
import { Credit } from '../../models';

export const up = async (knex: Knex): Promise<void> => {
  const hasTable = await knex.schema.hasTable(Credit.tableName);
  if (!hasTable) {
    await knex.schema.createTable(Credit.tableName, (table: Knex.TableBuilder) => {
      table.increments();
      table.timestamps();
      table.string('user_id').notNullable().unique();
      table.string('balance').notNullable();    
    });
  } else {
    console.log("Table Credit already exists, skipping...");
  }
}

export const down = async (knex: Knex): Promise<void> => {
  const hasTable = await knex.schema.hasTable(Credit.tableName);
  if (hasTable) {
    knex.schema.dropTable(Credit.tableName)
  } else {
    console.log("Table Credit doesn't exist, skipping...");
  }
}
