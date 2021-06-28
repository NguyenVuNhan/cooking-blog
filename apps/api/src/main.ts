import 'reflect-metadata'; // Required by class-transformer
import cluster from 'cluster';
import { connect } from 'mongoose';
import app from './app/app';
import { logger } from './app/logger';
import { environment as config } from './environments/environment';
import { cpus } from 'os';
import { clusterEvent, processEvent } from './app/nativeEvent';

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
    // Main entry
    main().catch((e) => {
      logger.error('Running app error: ', e);
      process.exit(1);
    });
  }
} else {
  // Catch Process event
  processEvent();
  // Main entry
  main().catch((e) => {
    logger.error('Running app error: ', e);
    process.exit(1);
  });
}
