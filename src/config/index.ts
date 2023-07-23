import * as dotenv from 'dotenv';

dotenv.config();

export enum NodeEnv {
  TEST = 'test',
  DEV = 'development',
  PRODUCTION = 'production'
}

interface Env {
  env: NodeEnv;
  knexDebug: boolean;
  port: number;
  defaultPage: number;
  defaultPageSize: number;
  apiVersion: string;
  appSecret: string;
  tokenExpiresIn: number;
  randomApi: string;
  databaseUrl: string;
}

export const config: Env = {
  env: (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEV,
  knexDebug: process.env.KNEX_DEBUG === 'true',
  port: Number(process.env.APP_PORT) || 5000,
  defaultPage: 0,
  defaultPageSize: 10,
  apiVersion: process.env.API_VERSION || 'v1',
  appSecret: process.env.APP_SECRET || 'NO_SECRET',
  tokenExpiresIn: Number(process.env.TOKEN_EXPIRES_IN) || 90000,
  randomApi: process.env.RANDOM_API || 'https://www.random.org/',  
  databaseUrl: process.env.databaseUrl || '',
};
