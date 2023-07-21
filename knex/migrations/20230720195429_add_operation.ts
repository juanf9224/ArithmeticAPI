import { Knex } from 'knex';
import { Operation } from '../../src/models';
import { OperationType } from '../../src/constants/operation.constant';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Operation.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('type').checkIn(Object.values(OperationType));
    table.decimal('cost');
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Operation.tableName);
