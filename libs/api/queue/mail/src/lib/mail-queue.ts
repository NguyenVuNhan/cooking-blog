import { BaseQueue } from '@cookingblog/api/base/queue';
import { ILogger } from '@cookingblog/express/api/common';
import { ConnectionOptions, JobsOptions, QueueScheduler } from 'bullmq';
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

    const scheduler = new QueueScheduler(queueName, { connection });
    scheduler.on('failed', (jobId, failedReason, prev) => {
      this.logger.warn(
        `Queue ${this.name} :: Job ${jobId} failed. Previous ${prev}`
      );
      this.logger.info(
        `\tReason: ${failedReason.name} - ${failedReason.message}`
      );
    });
    scheduler.on('stalled', (jobId, prev) => {
      this.logger.warn(
        `Queue ${this.name} :: Job ${jobId} stalled. Previous ${prev}`
      );
    });
  }

  async passwordReset(to: string, url: string, user: string, token: string) {
    await this.queue.add('password_reset_mail', {
      mailOpts: {
        from: 'non-reply@cookingblog.nvnapp.ga',
        to,
        subject: `Reset Password`,
        text: `
Dear user,

you have requested a password reset on ${new Date().toString()}. If you want to reset your password, please follow this links

${url}/password-reset/${user}/${token}

If you need assistance, please contact our support at nvn.raspberrypi@gmail.com

Thanks

Cooking Blog team`,
      },
    });
  }

  async enqueue(jobName: string, mail: MailJob, jobOpts?: JobsOptions) {
    await this.queue.add(jobName, mail, jobOpts);

    this.logger.info(`Enqueued an email sending to ${mail.mailOpts.to}`);
  }

  close() {
    return this.queue.close();
  }
}
