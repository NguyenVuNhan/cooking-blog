import { BaseWorker } from '@cookingblog/api/base/queue';
import { ILogger } from '@cookingblog/express/api/common';
import { ConnectionOptions, Job } from 'bullmq';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as puppeteer from 'puppeteer';
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
    let attachments: { filename: string; content: Buffer }[];
    if (job.data.htmlAttachments) {
      attachments = await Promise.all(
        job.data.htmlAttachments.map(async (attachment) => {
          const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          });
          const page = await browser.newPage();

          await page.setContent(attachment.html);

          const pdf = await page.pdf({ format: 'a4', printBackground: true });

          await browser.close();

          return { filename: `${attachment.name}.pdf`, content: pdf };
        })
      );
    }

    const info = await this.transporter.sendMail({
      ...job.data.mailOpts,
      attachments,
    });

    this.logger.info(`Message sent: ${info.messageId}`);

    return info;
  }
}
