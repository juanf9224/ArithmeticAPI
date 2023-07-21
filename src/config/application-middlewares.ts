import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dayjs from 'dayjs';
import express, { Express, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';


/**
 *
 * @param app An instance of the express Applicaton.
 */
const addExpressMiddleware = (app: Express) => {
    app.use(helmet());
    app.use(cookieParser());
    app.use(json());
    app.use(cors());
    app.use(compression());
    app.use(morgan((tokens, req, res) => {
        return [
            `[ (${dayjs(new Date(Date.now())).format('hh:mm:ss a M/DD/YYYY')})  => PID ${process.pid} ] `,
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
        ].join(' ');
    }));
    app.use(express.json({ limit: '5mb' }));
};

export default addExpressMiddleware;