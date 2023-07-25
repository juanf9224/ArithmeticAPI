import { Knex } from 'knex';
import { Record } from '../../models';
import dayjs from 'dayjs';

export const up = async (knex: Knex): Promise<void> => {
  const hasTable = await knex.schema.hasTable(Record.tableName);
  if (!hasTable) {
    await knex.schema.createTable(Record.tableName, (table: Knex.TableBuilder) => {
      table.increments();
      table.timestamps();
      table.string('operation_response').notNullable();
      table.float('amount').notNullable();
      table.float('userBalance').notNullable();
      table.dateTime('date').notNullable().defaultTo(dayjs().toISOString());
      table.integer('user_id').notNullable();
      table.integer('operation_id').notNullable();
    });
  } else {
    console.log('Table Record already exists, skipping...');
  }
}

  

export const down = async (knex: Knex): Promise<void> => {
  const hasTable = await knex.schema.hasTable(Record.tableName);
  if (hasTable) {
    knex.schema.dropTable(Record.tableName)
  } else {
    console.log("Table Record doesn't exist, skipping...");
  }
}
