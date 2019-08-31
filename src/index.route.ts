import { Application } from 'express';
import userRouter from './users/user.route';

const applyRoutes = (app: Application) => {
  app.use(userRouter);
};

export default applyRoutes;
