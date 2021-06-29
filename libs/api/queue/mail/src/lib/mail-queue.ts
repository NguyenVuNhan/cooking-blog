import { BaseQueue } from '@cookingblog/api/base/queue';
import { ILogger } from '@cookingblog/express/api/common';
import { ConnectionOptions } from 'bullmq';
import { MailJob, queueName } from './types';

export class MailQueue extends BaseQueue<MailJob, void> {
  constructor(connection: ConnectionOptions, logger: ILogger) {
    super(
      queueName,
      {
        defaultJobOptions: {
          attempts: 5,
          backoff: { type: 'exponential', delay: 3000 },
        },
        connection,
      },
      logger
    );
  }

  async enqueue(jobName: string, mail: MailJob) {
    await this.queue.add(jobName, mail);

    this.logger.info(`Enqueued an email sending to ${mail.mailOpts.to}`);
  }

  close() {
    return this.queue.close();
  }
}
