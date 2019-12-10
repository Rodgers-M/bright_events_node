import { Application, Request, Response } from 'express';
import { getUserRouter } from './domains/users/user.route';

const applyRoutes = (app: Application) => {
  app.use(getUserRouter());
  app.use('*', (req: Request, res: Response) => res.status(404).json({ message: `Route ${req.method} ${req.url} not found`}));
};

export default applyRoutes;
