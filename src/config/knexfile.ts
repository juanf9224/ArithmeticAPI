import { NodeEnv, config } from '.';
import * as path from 'path';
import objection from 'objection';
import { Knex } from 'knex';

console.log(config.env);

const defaultKnexConfig: Knex.Config = {
  client: 'pg',
  migrations: {
    extension: config.env === NodeEnv.PRODUCTION ? 'js': 'ts',
    tableName: 'knex_migrations',
    directory: path.resolve('../db/migrations'),
  },
  seeds: {
    extension: config.env === NodeEnv.PRODUCTION ? 'js': 'ts',
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
