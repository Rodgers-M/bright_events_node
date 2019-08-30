import { Application } from 'express';
import userRouter from './user';

const applyRoutes = (app: Application) => {
  app.use(userRouter);
};

export default applyRoutes;
