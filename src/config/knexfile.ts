import { NodeEnv, config } from '.';
import * as path from 'path';
import objection from 'objection';
import { Knex } from 'knex';

console.log(`Running in mode: ${config.env}`);

const shouldUseSSL = config.env === NodeEnv.PRODUCTION ? { rejectUnauthorized: false } : false;
const connection: Knex.PgConnectionConfig = config.databaseUrl ? {
    connectionString: config.databaseUrl,
    ssl: shouldUseSSL,
} : {
      host: config.host,
      port: config.dbPort,
      database: config.database,
      user: config.dbUser,
      password: config.dbPassword,
      ssl: shouldUseSSL,
};

export default {
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
  connection
} as Knex.Config;
