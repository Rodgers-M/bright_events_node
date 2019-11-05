import {
    Request, Response, NextFunction, ErrorRequestHandler,
} from 'express';
import winston from 'winston';
import { BrightEventsError } from '../util/brightEvents.error';

export function globalErrorHandler(logger: winston.Logger): ErrorRequestHandler {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }

    if ( error instanceof BrightEventsError) {
      return res.status(error!.statusCode || 500)
        .json({ message: error.message });
    }

    if (logger) {
      logger.info(`unhandled error ${error}`);
    }

    const message = error.message || error;
    return res.status(500).json({ message });
  };
}
