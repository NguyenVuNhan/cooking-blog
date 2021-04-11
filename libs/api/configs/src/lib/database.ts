import mongoose from 'mongoose';
import bluebird from 'bluebird';
import { MongoError } from 'mongodb';

import { AppConfig } from '@api/configs';
import { log } from '@api/middlewares';

class Database {
  // Initialize your database pool
  public static init(config: AppConfig): void {
    const dsn = config.mongodbUrl;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>mongoose).Promise = bluebird;

    mongoose.set('useCreateIndex', true);

    mongoose.connect(dsn, options, (error: MongoError) => {
      // handle the error case
      if (error) {
        log.info('Failed to connect to the Mongo server!!');
        // eslint-disable-next-line no-console
        console.log(error);
        throw error;
      } else {
        log.info('connected to mongo server at: ' + dsn);
      }
    });
  }
}

export default Database;
