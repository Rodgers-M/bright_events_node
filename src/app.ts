import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { Server } from 'http';
import graphqlHTTP from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
// import applyRoutes from './index.route';
import { LoggerStream, logger } from './shared/logger';
import { globalErrorHandler } from './lib/middlewares/globalErrorHandler';
import { schema } from './index.schema';

export class App {
  private appServer: Server;
  private app: express.Application;

  constructor() {
    this.app = this.createExpressApp();
  }

  public createExpressApp(): express.Application {
    const application: express.Application = express();

    application.use(express.json());

    if (application.get('env') === 'development') {
      application.use(morgan('dev', { stream : new LoggerStream() }));
    }

    application.use(passport.initialize());
    // applyRoutes(application);
    application.use('/graphql', graphqlHTTP({
      schema,
      graphiql: false,
    }));

    application.get('/playground', expressPlayground({ endpoint: '/graphql' }));

    application.use(globalErrorHandler(logger));

    return application;
  }

  public start(port: number): void {
    this.appServer = this.app.listen(port, () => {
      logger.info(`Application running on port: ${ port }`);
    });
  }

  public async stop(): Promise<void> {
    this.appServer.close(() => {
      logger.info('app server stoped');
    });
  }

}
