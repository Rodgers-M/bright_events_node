import appRoot from 'app-root-path';
import { createLogger, format, transports} from 'winston';

const logOptions = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
};

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.colorize()
  ),
  // transports: [
    // new transports.File(logOptions.file),
  // ],
  exitOnError: false,
});

export class LoggerStream {
  public write(message: string) {
     logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
}

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

export default logger;
