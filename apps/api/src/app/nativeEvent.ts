import { logger } from './logger';

export const clusterEvent = (cluster: typeof import('cluster')) => {
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
};

export const processEvent = () => {
  process.on('beforeExit', async (code) => {
    logger.error(`Server :: Process beforeExit event with code ${code}`);
    process.exit(1);
  });

  process.on('SIGTERM', async () => {
    logger.error(`Server :: Process ${process.pid} received a SIGTERM signal`);
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.error(`Server :: Process ${process.pid} has been interrupted`);
    process.exit(0);
  });

  process.on('uncaughtException', (exception) => {
    logger.error(exception.stack);
    process.exit(0);
  });

  process.on('warning', (warning) => logger.warn(warning.stack));
};
