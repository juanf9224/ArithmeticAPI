import express from 'express';
import addExpressMiddleware from './config/application-middlewares';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger-docs';
import router from './router';

const app = express();
app.disable('etag');
addExpressMiddleware(app);
app.use(
    "/v1/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
)
app.use(router);

export default app;
