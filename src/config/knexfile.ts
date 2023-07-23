import { config } from '.';
import * as path from 'path';
import objection from 'objection';

const defaultKnexConfig = {
  client: 'sqlite3',
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve('./db/migrations'),
  },
  seeds: {
    tableName: 'knex_seeds',
    directory: path.resolve('./db/seeds'),
  },
  ...objection.knexSnakeCaseMappers(),
  useNullAsDefault: true, // Required for SQLite
};

export default {
  development: {
    ...defaultKnexConfig,
    connection: { filename: config.dbFilename },
  },
  test: {
    ...defaultKnexConfig,
    connection: { filename: config.dbTestFilename },
  },
  production: {
    ...defaultKnexConfig,
    connection: { filename: config.dbFilename },
  },
};
