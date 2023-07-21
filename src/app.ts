import express, { NextFunction, Request, Response } from 'express';
import addExpressMiddleware from './config/application-middlewares';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger-docs';
import router from './router';

const app = express();

addExpressMiddleware(app);
app.disable('etag');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization'
    );
    next();
})
app.use(router);

export default app;
