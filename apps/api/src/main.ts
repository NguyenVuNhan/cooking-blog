import 'reflect-metadata'; // Required by class-transformer
import { MailWorker } from '@cookingblog/api/queue/mail';
import { ConnectionOptions } from 'bullmq';
import cluster from 'cluster';
import IORedis from 'ioredis';
import { connect } from 'mongoose';
import { cpus } from 'os';
import Application from './app/app';
import { logger } from './app/logger';
import { clusterEvent, processEvent } from './app/nativeEvent';
import { environment as config } from './environments/environment';

async function main(connection: ConnectionOptions) {
  const app = new Application(connection);

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

  // Start up worker
  new MailWorker(connection, config.smtp, logger);
}

// Only start cluster mode in production env
if (config.production) {
  if (cluster.isMaster) {
    // Catch Process event
    processEvent();

    // Cluster
    const CPUS = cpus();
    CPUS.forEach(() => cluster.fork());

    clusterEvent(cluster);
  } else {
    // Enable worker
    const connection = new IORedis({
      host: config.redisHttpHost,
      port: config.redisHttpPort,
      db: 3,
    });

    // Main entry
    main(connection).catch((e) => {
      logger.error('Running app error: ', e);
      process.exit(1);
    });
  }
} else {
  // Catch Process event
  processEvent();

  // Enable worker
  const connection = new IORedis({
    host: config.redisHttpHost,
    port: config.redisHttpPort,
    db: 3,
  });

  // Main entry
  main(connection).catch((e) => {
    logger.error('Running app error: ', e);
    process.exit(1);
  });
}
