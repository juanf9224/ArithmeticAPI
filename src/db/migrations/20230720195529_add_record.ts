import { Knex } from 'knex';
import { Record } from '../../models';
import dayjs from 'dayjs';

export const up = async (knex: Knex): Promise<void> => {
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
}

  

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Record.tableName);
