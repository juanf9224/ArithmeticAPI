import { config } from '.';
import * as path from 'path';
import objection from 'objection';

const defaultKnexConfig = {
  client: 'pg',
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve('../db/migrations'),
  },
  seeds: {
    tableName: 'knex_seeds',
    directory: path.resolve('../db/seeds'),
  },
  ...objection.knexSnakeCaseMappers(),
  useNullAsDefault: true, // Required for SQLite
};

export default {
  development: {
    ...defaultKnexConfig,
    connection: { 
      host: config.host,
      port: config.dbPort,
      database: config.database,
      user: config.dbUser,
      password: config.dbPassword
 },
  },
  test: {
    ...defaultKnexConfig,
    connection: { 
      host: config.host,
      port: config.dbPort,
      database: config.database,
      user: config.dbUser,
      password: config.dbPassword
    },
  },
  production: {
    ...defaultKnexConfig,
    connection: { 
      host: config.host,
      port: config.dbPort,
      database: config.database,
      user: config.dbUser,
      password: config.dbPassword
    },
  },
};
