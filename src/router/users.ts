import { Router } from 'express';
import { getUser } from '../controller/users';

const usersRouter = Router();

usersRouter.get('/', getUser);

export default usersRouter;
