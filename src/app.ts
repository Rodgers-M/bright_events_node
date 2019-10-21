import express from 'express';
import morgan from 'morgan';
import applyRoutes from './index.route';
import { LoggerStream } from './shared/logger';

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
    applyRoutes(this.app);
  }

}

export default new App().app;
