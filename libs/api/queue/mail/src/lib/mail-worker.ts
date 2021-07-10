import { BaseWorker } from '@cookingblog/api/base/queue';
import { ILogger } from '@cookingblog/express/api/common';
import { ConnectionOptions, Job } from 'bullmq';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { MailJob, queueName } from './types';

export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export class MailWorker extends BaseWorker<MailJob, void> {
  private transporter: Mail;

  constructor(
    connection: ConnectionOptions,
    smtpConfig: SMTPConfig,
    logger: ILogger
  ) {
    super(queueName, { connection }, logger);

    this.transporter = createTransport({
      service: 'Gmail',
      auth: {
        user: smtpConfig.auth.user,
        pass: smtpConfig.auth.pass,
      },
    });
  }

  protected async process(job: Job<MailJob, void>): Promise<void> {
    const info = await this.transporter.sendMail({
      ...job.data.mailOpts,
    });

    this.logger.info(`Message sent: ${info.messageId}`);

    return info;
  }
}
