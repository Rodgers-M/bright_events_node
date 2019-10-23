import { Application } from 'express';
import { getUserRouter } from './domains/users/user.route';

const applyRoutes = (app: Application) => {
  app.use(getUserRouter());
};

export default applyRoutes;
