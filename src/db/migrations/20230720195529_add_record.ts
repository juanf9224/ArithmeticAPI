import { Knex } from 'knex';
import { Record } from '../../models';
import dayjs from 'dayjs';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(Record.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('operation_response').notNullable();
    table.float('amount');
    table.float('userBalance');
    table.dateTime('date').notNullable().defaultTo(dayjs().format('YYY-MM-DDTHH:mm:ssZ[Z]'));
    table.integer('user_id');
    table.integer('operation_id');
  });
}

  

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Record.tableName);
