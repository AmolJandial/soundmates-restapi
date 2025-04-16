import { Router } from 'express';
import { verifyOtp, verifyPhone, register } from '../controller/auth';

const authRouter = Router();

authRouter.post('/verifyPhone', verifyPhone);
authRouter.post('/verifyOtp', verifyOtp);
authRouter.post('/register', register);

export default authRouter;
