import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { Record } from '../models/record.model';

export default Factory.define<Record>(Record.tableName).attrs({
  operation_id: () => faker.number.int({ min: 1, max: 6}),
  user_id: () => faker.number.int({ max: 10000}),
  amount: () => faker.number.float({ max: 200.00}),
  userBalance: () => faker.number.float({ max: 200.00}),
  operationResponse: () => faker.number.int({ max: 10000 }),
  date: () => new Date(),
});
