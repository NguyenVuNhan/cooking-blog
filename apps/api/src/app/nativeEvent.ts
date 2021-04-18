import { log } from '@cookingblog/shared/api/utils';

class NativeEvent {
  public cluster(_cluster: typeof import('cluster')): void {
    // Catch cluster listening event...
    _cluster.on('listening', (worker) =>
      log.info(
        `Server :: Cluster with ProcessID '${worker.process.pid}' Connected!`
      )
    );

    // Catch cluster once it is back online event...
    _cluster.on('online', (worker) =>
      log.info(
        `Server :: Cluster with ProcessID '${worker.process.pid}' has responded after it was forked! `
      )
    );

    // Catch cluster disconnect event...
    _cluster.on('disconnect', (worker) =>
      log.info(
        `Server :: Cluster with ProcessID '${worker.process.pid}' Disconnected!`
      )
    );

    // Catch cluster exit event...
    _cluster.on('exit', (worker, code, signal) => {
      log.info(
        `Server :: Cluster with ProcessID '${worker.process.pid}' is Dead with Code '${code}, and signal: '${signal}'`
      );
      // Ensuring a new cluster will start if an old one dies
      _cluster.fork();
    });
  }

  public process(): void {
    // Catch the Process's uncaught-exception
    process.on('uncaughtException', (exception) => log.error(exception.stack));

    // Catch the Process's warning event
    process.on('warning', (warning) => log.warn(warning.stack));
  }
}

export default new NativeEvent();
