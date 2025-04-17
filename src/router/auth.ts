import { Router } from 'express';
import { verifyOtp, verifyPhone, register, login } from '../controller/auth';

const authRouter = Router();

authRouter.post('/verifyPhone', verifyPhone);
authRouter.post('/verifyOtp', verifyOtp);
authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;
