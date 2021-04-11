import { AppConfig } from '@api/configs';
import { log } from '@api/middlewares';
import kue, { DoneCallback, Job, JobCallback } from 'kue';

class Queue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public jobs: any;

  constructor(config: AppConfig) {
    this.jobs = kue.createQueue({
      prefix: config.redisPrefix,
      redis: {
        port: config.redisHttpPort,
        host: config.redisHttpHost,
        db: config.redisDB,
      },
    });

    this.jobs
      .on('job enqueue', (id: number, type: string | JobCallback) =>
        log.info(`Queue :: #${id} Processing of type '${type}'`)
      )
      .on('job complete', (id: number) => this.removeProcessedJob(id));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public dispatch(jobName: string, args: Object, callback: Function): void {
    this.jobs.create(jobName, args).save();

    this.process(jobName, 3, callback);
  }

  private removeProcessedJob(id: number): void {
    log.info(`Queue :: #${id} Processed`);

    kue.Job.get(id, (err, job) => {
      if (err) {
        return;
      }

      job.remove((err: Error) => {
        if (err) {
          throw err;
        }

        log.info(`Queue :: #${id} Removed Processed Job`);
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private process(jobName: string, count: number, callback: Function): void {
    this.jobs.process(jobName, count, (job: Job, done: DoneCallback) => {
      done(); // Notifies KUE about the completion of the job!

      callback(job.data);
    });
  }
}

export default Queue;
