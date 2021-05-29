import { ILogger } from '@cookingblog/express/api/common';
import { connection, connect, Schema, Mongoose } from 'mongoose';
import { IMongoConfig } from './types';

export const Mixed = Schema.Types.Mixed;

export class MongoDB {
  logger: ILogger;
  config: IMongoConfig;

  constructor(
    {
      connectionString = 'mongodb://localhost:27017/example',
      user = '',
      password = '',
    }: IMongoConfig,
    logger: ILogger = console
  ) {
    this.logger = logger;
    this.config = {
      connectionString,
      user,
      password,
    };
    this.listen();
  }

  connect(): Promise<Mongoose> {
    return connect(this.config.connectionString, {
      user: this.config.user,
      pass: this.config.password,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  private listen() {
    connection.on('connecting', () => {
      this.logger.info('Connecting to Mongodb');
    });

    connection.on('connected', () => {
      this.logger.info('Connected to Mongodb \n');
    });

    connection.on('disconnected', () => {
      this.logger.warn('Disconnected Mongodb');
    });

    connection.on('error', (err: Error) => {
      this.logger.error(err.message);
    });

    connection.on('reconnectFailed', async (err: Error) => {
      this.logger.error('Reconnect to Mongodb failed', err);
      process.exit(1);
    });
  }
}
