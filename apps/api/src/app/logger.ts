import path from 'path';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';
import { environment as config } from '../environments/environment';

// Logger transports
export const transports = [
  new winston.transports.DailyRotateFile({
    zippedArchive: true,
    filename: path.resolve(__dirname, '.logs/%DATE%.log'),
    datePattern: 'DD-MM-yyyy',
    format: format.combine(
      format.timestamp(),
      format.printf(
        (info) => `${info.timestamp} [${info.level}]: ${info.message}`
      )
    ),
    level: 'info',
  }),
  new winston.transports.Console({
    format: format.combine(format.colorize(), format.simple()),
    level: config.production ? 'info' : 'debug',
  }),
];

// Configuration for default logger
winston.level = config.production ? 'info' : 'debug';
for (const transport of transports) {
  winston.add(transport);
}
export const logger = winston;
