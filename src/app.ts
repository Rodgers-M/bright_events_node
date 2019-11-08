import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import applyRoutes from './index.route';
import { LoggerStream, logger } from './shared/logger';
import { globalErrorHandler } from './lib/middlewares/globalErrorHandler';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    if (this.app.get('env') === 'development') {
      this.app.use(morgan('dev', { stream : new LoggerStream() }));
    }
    this.app.use(express.json());
    this.app.use(passport.initialize());
    applyRoutes(this.app);
    this.app.use(globalErrorHandler(logger));
  }

}

export default new App().app;
