import { Router } from 'express';
import logger from '../util/logger';
// import { createUser } from './user.service';

const userRouter: Router = Router();

userRouter.post('/users', (req, res) => {
  logger.info('req body', req.body);
  res.json({message: 'your request has been recieved'});
});
userRouter.get('/users', (req, res) => res.json({message: 'users found'}));

export default userRouter;
