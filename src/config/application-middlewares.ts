import compression from 'compression';
import { config } from '../config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dayjs from 'dayjs';
import express, { Express, NextFunction, Request, Response, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger-docs';


/**
 *
 * @param app An instance of the express Applicaton.
 */
const addExpressMiddleware = (app: Express) => {
    app.use(helmet());
    app.use(cookieParser());
    app.use(json());
    app.use(cors({
        credentials: true,
        optionsSuccessStatus: 200,
        exposedHeaders: 'set-cookie',
        origin: config.clientHost,
        allowedHeaders: ['Content-Length', 'Accept', 'X-Requested-With', 'Content-Type', 'Authorization'],
    }));
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
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', config.clientHost);
        next();
    })
    // Swagger Docs
    app.use(
        "/api/v1/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocs)
    )
};

export default addExpressMiddleware;