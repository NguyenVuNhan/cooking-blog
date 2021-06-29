import { LoginDTO, RegisterDTO } from '@cookingblog/api/auth/dto';
import { MailQueue } from '@cookingblog/api/queue/mail';
import { ILogger, validate } from '@cookingblog/express/api/common';
import { Controller, sendSuccessResponse } from '@cookingblog/express/api/core';
import { ConnectionOptions } from 'bullmq';
import { Request, Response } from 'express';
import { IAuthService } from './auth.types';

export class AuthController extends Controller {
  private mailQueue: MailQueue;
  constructor(
    private authService: IAuthService,
    mqConnection: ConnectionOptions,
    private logger: ILogger
  ) {
    super('/api/auth');
    this.mailQueue = new MailQueue(mqConnection, this.logger);
    this.setupRouter();
  }

  setupRouter() {
    this.router.post(
      `/login`,
      validate(LoginDTO),
      this.wrapTryCatch(this.login)
    );
    this.router.post(
      `/register`,
      validate(RegisterDTO),
      this.wrapTryCatch(this.register)
    );
    this.router.get('/reset-password', this.wrapTryCatch(this.resetPassword));
  }

  private async resetPassword(req: Request, res: Response) {
    const mail = req.query.mail as string;
    this.mailQueue.enqueue('mail_queue', {
      mailOpts: {
        from: 'manast@taskforce.sh',
        to: mail,
        subject: `This is your email`,
        text: 'You are receiving email',
      },
    });

    sendSuccessResponse(null, res, 'You have been successfully logged in');
  }

  private async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const data = await this.authService.login(email, password, {
      appSecret: req.app.locals.appSecret,
      expiresIn: req.app.locals.jwtExpiresIn * 60,
    });

    sendSuccessResponse(data, res, 'You have been successfully logged in');
  }

  private async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const data = await this.authService.register(name, email, password);

    sendSuccessResponse(data, res, 'You have been successfully registered');
  }
}
