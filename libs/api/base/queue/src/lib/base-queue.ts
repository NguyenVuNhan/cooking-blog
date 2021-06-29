import { ILogger } from '@cookingblog/express/api/common';
import { Queue, QueueOptions } from 'bullmq';

export interface BaseQueueProps {
  name: string;
  option: QueueOptions;
  logger: ILogger;
}

export class BaseQueue<T, R = void> {
  queue: Queue<T, R, string>;

  constructor(
    private name: string,
    option: QueueOptions,
    protected logger: ILogger
  ) {
    this.queue = new Queue<T, R, string>(this.name, option);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.queue.on('completed', (jobId: string, returnvalue: any) =>
      this.onCompleted(jobId, returnvalue)
    );

    this.queue.on('failed', (jobId: string, failedReason: string) =>
      this.onFailed(jobId, failedReason)
    );

    // eslint-disable-next-line @typescript-eslint/ban-types
    this.queue.on('progress', (jobId: string, progress: number | object) =>
      this.onProcess(jobId, progress)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected onCompleted(jobId: string, returnvalue: any) {
    this.logger.info(`Queue Job ${jobId} finished`);
    this.logger.debug(returnvalue);
  }

  protected onFailed(jobId: string, failedReason: string) {
    this.logger.info(`Queue Job ${jobId} failed. Reason: ${failedReason}`);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected onProcess(jobId: string, progress: number | object) {
    this.logger.info(`Job ${jobId} process: ${progress}`);
  }
}
