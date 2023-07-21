import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { User } from '../models';
import { Status } from '../constants/user.constant';

export default Factory.define<User>(User.tableName).attrs({
  username: () => `${faker.person.firstName()} ${faker.person.lastName()}`,
  password: () => faker.string.alphanumeric(6),
  status: () => faker.helpers.enumValue(Status),
});
