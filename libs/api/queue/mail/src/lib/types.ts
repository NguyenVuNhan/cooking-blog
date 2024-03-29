export const queueName = 'mail_queue';

export interface MailJob {
  mailOpts: {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    generateTextFromHTML?: boolean;
  };
}
