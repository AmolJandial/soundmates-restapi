import e from 'express';
import { errorMiddleware } from './middleware/error_middleware';
import morgan from 'morgan/index';
import authRouter from './router/auth';

const app = e();

app.use(morgan('combined'));
app.use(e.json());

app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

export default app;
