/* eslint-disable no-console */
import { cpus } from 'os';
import * as cluster from 'cluster';

import App from './app/app';
import NativeEvent from './app/nativeEvent';

if (cluster.isMaster) {
  /**
   * Catches the process events
   */
  NativeEvent.process();

  /**
   * Clear the console before the app runs
   */
  App.clearConsole();

  /**
   * Find the number of available CPUS
   */
  const CPUS = cpus();

  /**
   * Fork the process, the number of times we have CPUs available
   */
  CPUS.forEach(() => cluster.fork());

  /**
   * Catches the cluster events
   */
  NativeEvent.cluster(cluster);

  /**
   * Loads the Queue Monitor iff enabled
   */
  App.loadQueue();

  /**
   * Run the Worker every minute
   * Note: we normally start worker after
   * the entire app is loaded
   */
  setTimeout(() => App.loadWorker(), 1000 * 60);
} else {
  /**
   * Run the Database pool
   */
  App.loadDatabase();

  /**
   * Run the Server on Clusters
   */
  App.loadServer();
}
