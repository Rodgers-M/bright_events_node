import winston from 'winston';
import { App } from './app';

export const handleSignals = (logger: winston.Logger, app: App ): void => {
  const shutdown = (code: number): void => {
    if(app) {
      app.stop().then(() => {

        logger.info(`application stoped. exiting process with code ${code} ..`);
        process.exit(code);
      }).catch((error) => {
        logger.info('error while stopping application', error);
        process.exit(1);
      });
    }
  };

  process.on('exit', (code: number) => {
    logger.info(`application shutdown successful, code ${code}`);
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT received');
    shutdown(0);
  });

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    shutdown(0);
  });

  process.on('uncaughtException', (error: Error) => {
    logger.info('uncaught exception occurred', error);
    shutdown(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.info(`unhandled Rejection at: ${ promise }, reason  ${ reason }`);
    shutdown(1);
  });
};
