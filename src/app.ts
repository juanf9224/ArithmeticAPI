import express from 'express';
import addExpressMiddleware from './config/application-middlewares';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger-docs';
import router from './router';
import cors from "cors";
const app = express();

addExpressMiddleware(app);
app.disable('etag');
app.use(cors({
    credentials: true,
    origin: '*',
}))
app.use(
    "/v1/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
)
app.use(router);

export default app;
