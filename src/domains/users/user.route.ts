import { Router } from 'express';
import { UserService } from './user.service';
import { protectedAsyncRequestHandler } from '../../lib/util/protectedAsyncHandler';
import { HttpStatusCode } from '../../lib/util/http.enums';

export function getUserRouter(): Router {
  const userRouter: Router = Router();

  userRouter.post('/signup', protectedAsyncRequestHandler( async (req, res) => {
    const createUserResponse = await UserService.create(req.body);
    res.status(HttpStatusCode.CREATED).json(createUserResponse);
  }));

  userRouter.post('/login', protectedAsyncRequestHandler(async (req, res) => {
    const loginResponse = await UserService.login(req.body);
    res.status(200).json(loginResponse);
  }));

  return userRouter;
}
