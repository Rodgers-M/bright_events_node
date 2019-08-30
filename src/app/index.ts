import express from 'express';
// import morgan from 'morgan';
import { createConnection } from 'typeorm';
import logger from '../util/logger';
// import { LoggerStream } from '../util/logger';
import applyRoutes from './routes/index';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.connectDb();
  }

  private config(): void {
    this.app.use(express.json());
    applyRoutes(this.app);
    // TODO : figure out how to use morgan and winston to log app requests
    // this.app.use(morgan('combined', { stream : new LoggerStream() }));
  }

  private async connectDb(): Promise<void> {
    await createConnection();
    logger.info('db connection established');
  }
}

export default new App().app;
