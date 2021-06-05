/* eslint-disable no-console */

import { connect } from 'mongoose';
import { environment as config } from './environments/environment';
import { UserRepository } from '@api/models';
import { AuthService, UserService } from '@api/services';
import { RedisCache } from '@cookingblog/express/api/cache';
import { ServiceCache } from '@cookingblog/express/api/core';
import Application from './app/app';

// General
const logger = console;

const cache = new RedisCache(
  {
    host: config.redisHttpHost,
    port: config.redisHttpPort,
  },
  logger
);

// Repositories
const userRepository = new UserRepository();

// Services
const serviceCache: ServiceCache = {
  cache,
  appName: config.appName,
  uniqueKey: config.redisPrefix,
  second: config.redisTimeout,
};

const userService = new UserService({
  repo: userRepository,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'user' },
});
const authService = new AuthService({ logger, userService });

const app = new Application({ authService, logger, config });

async function main() {
  connect(
    config.mongodbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (error) => {
      logger.info('Connecting to mongodb');
      // handle the error case
      if (error) {
        logger.info('Failed to connect to the mongodb !!');
        // eslint-disable-next-line no-console
        console.log(error);
        throw error;
      } else {
        logger.info('Connected to mongodb');
      }
    }
  );

  app.showInfo();
  app.start();
}

main().catch((e) => {
  logger.error('Running app error: ', e);
  process.exit(1);
});

process.on('beforeExit', async (code) => {
  logger.error(`Process beforeExit event with code ${code}`);
  process.exit(1);
});

process.on('SIGTERM', async () => {
  logger.error(`Process ${process.pid} received a SIGTERM signal`);
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.error(`Process ${process.pid} has been interrupted`);
  process.exit(0);
});

// import { cpus } from 'os';
// import * as cluster from 'cluster';

// import App from './app/app';
// import NativeEvent from './app/nativeEvent';

// import 'reflect-metadata';

// if (cluster.isMaster) {
//   /**
//    * Catches the process events
//    */
//   NativeEvent.process();

//   /**
//    * Clear the console before the app runs
//    */
//   App.clearConsole();

//   /**
//    * Find the number of available CPUS
//    */
//   const CPUS = cpus();

//   /**
//    * Fork the process, the number of times we have CPUs available
//    */
//   CPUS.forEach(() => cluster.fork());

//   /**
//    * Catches the cluster events
//    */
//   NativeEvent.cluster(cluster);

//   /**
//    * Loads the Queue Monitor iff enabled
//    */
//   App.loadQueue();

//   /**
//    * Run the Worker every minute
//    * Note: we normally start worker after
//    * the entire app is loaded
//    */
//   setTimeout(() => App.loadWorker(), 1000 * 60);
// } else {
//   /**
//    * Run the Database pool
//    */
//   App.loadDatabase();

//   /**
//    * Run the Server on Clusters
//    */
//   App.loadServer();
// }
