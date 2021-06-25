import path from 'path';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

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
  }),
  new winston.transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  }),
];
