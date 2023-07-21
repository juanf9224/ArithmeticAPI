import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { User } from '../models';
import { OperationType } from '../constants/operation.constant';

export default Factory.define(User.tableName).attrs({
  type: () => `${faker.helpers.enumValue(OperationType)}`,
  cost: () => faker.number.int({ max: 100 }),
});
