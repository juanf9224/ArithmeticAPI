import * as dotenv from 'dotenv';

dotenv.config();

enum NodeEnv {
  TEST = 'test',
  DEV = 'development',
}

interface Env {
  env: NodeEnv;
  dbFilename: string;
  dbTestFilename: string;
  knexDebug: boolean;
  port: number;
  defaultPage: number;
  defaultPageSize: number;
  apiVersion: string;
  appSecret: string;
  tokenExpiresIn: number;
}

export const config: Env = {
  env: (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEV,
  dbFilename: process.env.DB_FILENAME || 'db.sqlite3',
  dbTestFilename: process.env.DB_TEST_FILENAME || 'db.test.sqlite3',
  knexDebug: process.env.KNEX_DEBUG === 'true',
  port: Number(process.env.APP_PORT) || 5000,
  defaultPage: 0,
  defaultPageSize: 10,
  apiVersion: process.env.API_VERSION || 'v1',
  appSecret: process.env.APP_SECRET || 'NO_SECRET',
  tokenExpiresIn: Number(process.env.TOKEN_EXPIRES_IN) || 90000
};
