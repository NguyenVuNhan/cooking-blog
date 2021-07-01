import {
  LoginDTO,
  RegisterDTO,
  ResetDTO,
  ResetRequestDTO,
} from '@cookingblog/api/auth/dto';
import { AppError, validate } from '@cookingblog/express/api/common';
import { Controller, sendSuccessResponse } from '@cookingblog/express/api/core';
import { Request, Response } from 'express';
import { IAuthService } from './auth.types';

export class AuthController extends Controller {
  constructor(private authService: IAuthService) {
    super('/api/auth');
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
    this.router.get(
      '/reset-password',
      validate(ResetRequestDTO, { subject: 'query' }),
      this.wrapTryCatch(this.resetRequest)
    );
    this.router.post(
      '/reset-password',
      validate(ResetDTO),
      this.wrapTryCatch(this.reset)
    );
  }

  private async reset(req: Request, res: Response) {
    const { user, token, password } = req.body;
    const success = await this.authService.reset(user, token, password);
    if (!success) {
      throw new AppError();
    }

    sendSuccessResponse(null, res, 'Password reset successfully');
  }

  private async resetRequest(req: Request, res: Response) {
    const mail = req.query.mail as string;
    await this.authService.resetRequest(mail, req.app.locals.url);
    sendSuccessResponse(
      null,
      res,
      'An email has been sent to you. Check that email and reset password'
    );
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
