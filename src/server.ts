import e from 'express';
import { errorMiddleware } from './middleware/error_middleware';
import morgan from 'morgan/index';
import authRouter from './router/auth';
import cookieParser from 'cookie-parser';
import usersRouter from './router/users';
import { verifyJwt } from './middleware/verify_jwt';
import artistsRouter from './router/artists.router';

const app = e();

app.use(morgan('combined'));
app.use(e.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use(verifyJwt);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/artists', artistsRouter);

app.use(errorMiddleware);

export default app;
