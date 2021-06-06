import { IAuthService, JWTOptions } from '@api/services';
import { LoginReq, RegisterReq } from '@cookingblog/api-interfaces';
import { ILogger, validate } from '@cookingblog/express/api/common';
import { Controller, sendSuccessResponse } from '@cookingblog/express/api/core';
import { Request, Response } from 'express';

export default class AuthController extends Controller {
  constructor(private authService: IAuthService, private logger: ILogger) {
    super('/api/auth');
    this.authService = authService;
    this.logger = logger;
    this.setupRouter();
  }

  setupRouter() {
    this.router.post(
      `/login`,
      validate(LoginReq),
      this.wrapTryCatch(this.login)
    );
    this.router.post(
      `/register`,
      validate(RegisterReq),
      this.wrapTryCatch(this.register)
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
