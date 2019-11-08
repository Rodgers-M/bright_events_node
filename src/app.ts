import express, { Router } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import applyRoutes from './index.route';
import { LoggerStream, logger } from './shared/logger';
import { globalErrorHandler } from './lib/middlewares/globalErrorHandler';

class App {
  public app: express.Application;
  public routes: Router[] = [];

  public createExpressApp(): express.Application {
    const application: express.Application = express();

    application.use(express.json());

    if (application.get('env') === 'development') {
      application.use(morgan('dev', { stream : new LoggerStream() }));
    }

    application.use(passport.initialize());
    applyRoutes(application);
    application.use(globalErrorHandler(logger));

    return application;
  }

  public start(port: number): void {
    const appServer = this.createExpressApp();
    appServer.listen(port, () => {
      logger.info(`Application running on port: ${ port }`);
    });
  }

}

export const app = new App();
