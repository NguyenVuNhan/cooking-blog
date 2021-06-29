import { BaseWorker } from '@cookingblog/api/base/queue';
import { ILogger } from '@cookingblog/express/api/common';
import { ConnectionOptions, Job } from 'bullmq';
import { MailJob, queueName } from './types';

export class MailWorker extends BaseWorker<MailJob, void> {
  constructor(connection: ConnectionOptions, logger: ILogger) {
    super(queueName, { connection }, logger);
  }

  protected async process(job: Job<MailJob, void>): Promise<void> {
    this.logger.info(JSON.stringify(job.data));
    return;
  }
}
