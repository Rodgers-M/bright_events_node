import { Router } from 'express';
import { createUser } from '../services/user';

const userRouter: Router = Router();

userRouter.post('/users', createUser);
userRouter.get('/users', (req, res) => res.json({message: 'users found'}));

export default userRouter;
