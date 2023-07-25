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
  host: string;
  dbPort: number;
  database: string;
  dbUser: string;
  dbPassword: string;
  refreshTokenExpiresIn: number;
  clientHost: string;
  testDbFilename: string;
}

const getDbCredentials = (env: string) => {
  switch(env) {
    case NodeEnv.PRODUCTION: {
      return {
        host: process.env.PGHOST || '',
        dbPort: Number(process.env.PGPORT) || 5432,
        database: process.env.PGDATABASE || 'LoanPro',
        dbUser: process.env.PGUSER || 'postgres',
        dbPassword: process.env.PGPASSWORD || ''
      }
    }
    case NodeEnv.TEST: {
      return {
        host: process.env.PGHOST || 'localhost',
        dbPort: Number(process.env.PGPORT) || 5432,
        database: process.env.PGDATABASE || 'LoanProTest',
        dbUser: process.env.PGUSER || 'postgres',
        dbPassword: process.env.PGPASSWORD || 'loanprotest.123',
      }
    }
    default: {
      return {
        host: process.env.TEST_PGHOST || 'localhost',
        dbPort: Number(process.env.PGPORT) || 5432,
        database: process.env.PGDATABASE || 'LoanProDev',
        dbUser: process.env.PGUSER || 'postgres',
        dbPassword: process.env.PGPASSWORD || 'loanprodev.123',
      }
    }
  }
}

export const config: Env = {
  env: (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEV,
  knexDebug: process.env.KNEX_DEBUG === 'true',
  port: Number(process.env.PORT) || 3001,
  defaultPage: 0,
  defaultPageSize: 10,
  apiVersion: process.env.API_VERSION || 'v1',
  appSecret: process.env.APP_SECRET || 'NO_SECRET',
  tokenExpiresIn: Number(process.env.TOKEN_EXPIRES_IN) || 3600,
  randomApi: process.env.RANDOM_API || 'https://www.random.org/',  
  databaseUrl: process.env.databaseUrl || '',
  ...getDbCredentials(process.env.NODE_ENV || 'development'),
  refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 86400,
  clientHost: process.env.CLIENT_HOST || 'http://localhost:3000',
  testDbFilename: process.env.TEST_DB_FILENAME || './../../db.test.sqlite3',
};
