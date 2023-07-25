import { Knex } from 'knex';
import { Record } from '../../models';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable(Record.tableName, (table: Knex.TableBuilder) => {
    table.boolean('deleted').defaultTo(false);
  })
}  

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable(Record.tableName, (table: Knex.TableBuilder) => {
    table.dropColumn('deleted');
  })
}  
