import Knex from 'knex';
import knexConfig from '../config/knexfile';
import { config } from '../config';

export default Knex(knexConfig[config.env]);
