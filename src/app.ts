import express from 'express';
import addExpressMiddleware from './config/application-middlewares';
import router from './router';

const app = express();
app.disable('etag');
addExpressMiddleware(app);
app.use(router);

export default app;
