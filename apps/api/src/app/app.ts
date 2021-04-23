import { Database, Express, Queue } from '@api/configs';
import { log } from '@cookingblog/shared/api/utils';
import kue from 'kue';
import { environment as config } from '../environments/environment';

class App {
  private express: Express;
  private queue: Queue;

  constructor() {
    this.express = new Express(config);
    this.queue = new Queue(config);
  }

  // Clear the console
  public clearConsole(): void {
    process.stdout.write('\x1B[2J\x1B[0f');

    this.queue.dispatch(
      'checkout',
      { foo: 'bar', fizz: 'buzz' },
      function (data: unknown) {
        // eslint-disable-next-line no-console
        console.log('>> here is the data', data);
      }
    );
  }

  // Loads your Server
  public loadServer(): void {
    log.info('Server :: Booting @ Master...');

    this.express.init();
  }

  // Loads the Database Pool
  public loadDatabase(): void {
    log.info('Database :: Booting @ Master...');

    Database.init(config);
  }

  // Loads the Worker Cluster
  public loadWorker(): void {
    log.info('Worker :: Booting @ Master...');
  }

  // Loads the Queue Monitor
  public loadQueue(): void {
    const isQueueMonitorEnabled: boolean = config.queueMonitor;
    const queueMonitorPort: number = config.queueMonitorHttpPort;

    if (isQueueMonitorEnabled) {
      kue.app.listen(queueMonitorPort);

      // eslint-disable-next-line no-console
      console.log(
        '\x1b[33m%s\x1b[0m',
        `Queue Monitor :: Running @ 'http://localhost:${queueMonitorPort}'`
      );
    }
  }
}

export default new App();
