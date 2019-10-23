import { Router } from 'express';
import { UserService } from './user.service';
import { protectedAsyncRequestHandler } from '../../util/protectedAsyncHandler';

export function getUserRouter(): Router {
  const userRouter: Router = Router();

  userRouter.post('/signup', protectedAsyncRequestHandler( async (req, res) => {
    await UserService.create(req.body);
    res.status(200).send('success');
  } ));

  return userRouter;
}
