import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { Operation } from '../models';
import { OperationType } from '../constants/operation.constant';

export default Factory.define<Operation>(Operation.tableName).attrs({
  type: () => faker.helpers.enumValue(OperationType),
  cost: () => faker.number.int({ max: 100 }),
});
