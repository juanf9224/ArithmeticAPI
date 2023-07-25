import { Knex } from 'knex';
import { Operation } from '../../models';
import { OperationType } from '../../constants/operation.constant';

export const up = async (knex: Knex): Promise<void> => {
  const hasTable = await knex.schema.hasTable(Operation.tableName);
  if (!hasTable) {
    await knex.schema.createTable(Operation.tableName, (table: Knex.TableBuilder) => {
      table.increments();
      table.timestamps();
      table.string('type').checkIn(Object.values(OperationType));
      table.decimal('cost');
    });
  } else {
    console.log('Table Operation already exists, skipping...');
  }
}

export const down = async (knex: Knex): Promise<void> => {
  const hasTable = await knex.schema.hasTable(Operation.tableName);
  if (hasTable) {
    knex.schema.dropTable(Operation.tableName)
  } else {
    console.log('Table Operation does not exist, skipping...');
  }
}
