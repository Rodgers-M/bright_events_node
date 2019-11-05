import { Router } from 'express';
import { UserService } from './user.service';
import { protectedAsyncRequestHandler } from '../../lib/util/protectedAsyncHandler';
import {HttpStatus, HttpStatusCode} from '../../lib/util/http.enums';

export function getUserRouter(): Router {
  const userRouter: Router = Router();

  userRouter.post('/signup', protectedAsyncRequestHandler( async (req, res) => {
    await UserService.create(req.body);
    res.status(HttpStatusCode.CREATED).send(HttpStatus.CREATED);
  } ));

  return userRouter;
}
