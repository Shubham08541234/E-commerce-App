import express from 'express'
import { userLogin, userRegister, adminLogin, verifyUser } from '../controllers/userController.js'
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);
userRouter.post('/adminLogin', adminLogin);
userRouter.post('/verifyUser', verifyUser);

export default userRouter;