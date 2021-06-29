import { AppError, ILogger } from '@cookingblog/express/api/common';
import { Worker, WorkerOptions, Job } from 'bullmq';

export interface BaseWorkerProps {
  name: string;
  option: WorkerOptions;
  logger: ILogger;
}

export class BaseWorker<T, R = void> {
  protected worker: Worker<T, R, string>;

  constructor(
    private name: string,
    option: WorkerOptions,
    protected logger: ILogger
  ) {
    this.worker = new Worker<T, R, string>(
      name,
      async (job: Job<T, R>): Promise<R> => {
        return await this.process(job);
      },
      option
    );
    this.worker.on('active', (job: Job<T, R>, prev: string) =>
      this.onActive(job, prev)
    );
    this.worker.on('completed', (job: Job<T, R>) => this.onCompleted(job));
    this.worker.on('drained', () => this.onDrained());
    this.worker.on('error', (failedReason: Error) =>
      this.onError(failedReason)
    );
    // eslint-disable-next-line @typescript-eslint/ban-types
    this.worker.on('progress', (job: Job, progress: number | object) =>
      this.onProcess(job, progress)
    );
  }

  protected async process(job: Job<T, R, string>): Promise<R> {
    this.logger.error(`Worker ${this.name} :: Unable to process job ${job.id}`);
    throw new AppError(500, `Job ${job.name} not setup correctly`);
  }

  protected onActive(job: Job<T, R>, prev: string) {
    this.logger.info(
      `Worker ${this.name} :: Job ${job.name} - ${job.id} active. Previously ${prev}`
    );
  }

  protected onCompleted(job: Job<T, R>) {
    this.logger.info(
      `Worker ${this.name} :: Job ${job.name} - ${job.id} completed`
    );
  }

  protected onDrained() {
    this.logger.info(`Worker ${this.name} :: worker drained`);
  }

  protected onError(failedReason: Error) {
    this.logger.warn(
      `Worker ${this.name} :: Job failed with error ${failedReason.name}: ${failedReason.message}`
    );
    this.logger.debug(failedReason.stack);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected onProcess(job: Job, progress: number | object) {
    this.logger.info(
      `Worker ${this.name} :: Job ${job.name} - ${job.id} process: ${progress}`
    );
  }
}
