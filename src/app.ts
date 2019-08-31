import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import applyRoutes from './index.route';
import logger from './util/logger';
import { LoggerStream } from './util/logger';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.connectDb();
  }

  private config(): void {
    if (this.app.get('env') === 'development') {
      this.app.use(morgan('dev', { stream : new LoggerStream() }));
    }
    this.app.use(express.json());
    applyRoutes(this.app);
  }

  private async connectDb(): Promise<void> {
    await createConnection();
    logger.info('db connection established');
  }
}

export default new App().app;
