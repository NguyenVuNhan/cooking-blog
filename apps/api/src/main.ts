import 'reflect-metadata'; // Required by class-transformer

import cluster from 'cluster';
import { connect } from 'mongoose';
import app from './app/app';
import { logger } from './app/logger';
import { environment as config } from './environments/environment';
import { cpus } from 'os';

async function main() {
  // Load database
  logger.info('Booting Database...');
  connect(
    config.mongodbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (error) => {
      logger.info('Connecting to mongodb');
      // handle the error case
      if (error) {
        logger.info('Failed to connect to the mongodb !!');
        logger.error(error);
        throw error;
      } else {
        logger.info('Connected to mongodb');
      }
    }
  );

  app.showInfo();
  app.start();
}

if (cluster.isMaster) {
  /**
   * Catch Process event
   */
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

  process.on('uncaughtException', (exception) => {
    logger.error(exception.stack);
    process.exit(0);
  });

  process.on('warning', (warning) => logger.warn(warning.stack));

  /**
   * Cluster
   */
  const CPUS = cpus();
  CPUS.forEach(() => cluster.fork());

  // Catch cluster listening event...
  cluster.on('listening', (worker) =>
    logger.info(
      `Server :: Cluster with ProcessID '${worker.process.pid}' Connected!`
    )
  );

  // Catch cluster once it is back online event...
  cluster.on('online', (worker) =>
    logger.info(
      `Server :: Cluster with ProcessID '${worker.process.pid}' has responded after it was forked! `
    )
  );

  // Catch cluster disconnect event...
  cluster.on('disconnect', (worker) =>
    logger.info(
      `Server :: Cluster with ProcessID '${worker.process.pid}' Disconnected!`
    )
  );

  // Catch cluster exit event...
  cluster.on('exit', (worker, code, signal) => {
    logger.info(
      `Server :: Cluster with ProcessID '${worker.process.pid}' is Dead with Code '${code}, and signal: '${signal}'`
    );
    // Ensuring a new cluster will start if an old one dies
    cluster.fork();
  });
} else {
  main().catch((e) => {
    logger.error('Running app error: ', e);
    process.exit(1);
  });
}
