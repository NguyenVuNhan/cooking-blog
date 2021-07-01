import { MailQueue } from '@cookingblog/api/queue/mail';
import { ITokenService } from '@cookingblog/api/token';
import { IUserModel, IUserService } from '@cookingblog/api/user';
import {
  AppError,
  ILogger,
  ValidationError,
} from '@cookingblog/express/api/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  AuthServiceProp,
  IAuthService,
  JWTOptions,
  JWTToken,
} from './auth.types';

export class AuthService implements IAuthService {
  private logger: ILogger;
  private userService: IUserService;
  private mailQueue: MailQueue;
  private tokenService: ITokenService;

  constructor({
    logger,
    userService,
    connection,
    tokenService,
  }: AuthServiceProp) {
    this.logger = logger;
    this.userService = userService;
    this.tokenService = tokenService;
    this.mailQueue = new MailQueue(connection, logger);
  }

  async reset(user: string, token: string, password: string): Promise<boolean> {
    const findToken = await this.tokenService.findOne({ user, token });
    if (!findToken) {
      throw new AppError(
        406,
        'Invalid request. Some thing went wrong with this link. Please try to request password reset again'
      );
    }
    await this.tokenService.deleteById(findToken.id);
    const findUser = await this.userService.findOne({ id: user });
    if (!findUser) {
      throw new AppError(
        406,
        'Invalid request. Some thing went wrong with this link. Please try to request password reset again'
      );
    }
    return this.userService.updateById(user, { password });
  }

  async resetRequest(email: string, baseUrl: string): Promise<void> {
    const token = await this.tokenService.generate(email);
    this.mailQueue.enqueue('mail_queue', {
      mailOpts: {
        from: 'non-reply@cookingblog.nvnapp.ga',
        to: email,
        subject: `Reset Password`,
        text: `${baseUrl}/password-reset/${token.user}/${token.resetToken}`,
      },
    });
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<IUserModel> {
    await this.userService.getByEmail(email, true);
    await this.userService.getByName(name, true);

    const user = await this.userService.create({ name, email, password });
    user.password = undefined;

    return user;
  }

  async login(
    email: string,
    password: string,
    jwtOptions?: { appSecret: string; expiresIn: number }
  ): Promise<JWTToken & { user: IUserModel }> {
    const user = await this.userService.get(email);

    if (!(await compare(password, user.password)))
      throw new ValidationError('Password not match');

    user.password = undefined;
    const token = this.generateJWT(user.id, jwtOptions);

    return { user, ...token };
  }

  private generateJWT(
    id: string,
    jwtOptions: Partial<JWTOptions> = {}
  ): JWTToken {
    const { appSecret = 'Secret', expiresIn } = jwtOptions;
    const today = new Date();
    const exp = new Date();
    exp.setSeconds(today.getSeconds() + expiresIn);

    const token = sign({ id }, appSecret, { expiresIn });

    return {
      token: 'Bearer ' + token,
      exp: exp.getTime(), // Convert time from millisecond to second
    };
  }
}
