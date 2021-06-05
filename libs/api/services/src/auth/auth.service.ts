import { IUserModel } from '@api/models';
import { ILogger, ValidationError } from '@cookingblog/express/api/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUserService } from '../user/user.types';
import {
  AuthServiceProp,
  IAuthService,
  JWTOptions,
  JWTToken,
} from './auth.types';

export default class AuthService implements IAuthService {
  logger: ILogger;
  userService: IUserService;

  constructor({ logger, userService }: AuthServiceProp) {
    this.logger = logger;
    this.userService = userService;
  }

  async login(
    email: string,
    password: string,
    jwtOptions?: { appSecret: string; expiresIn: number }
  ): Promise<{ user: IUserModel; token: JWTToken }> {
    const user = await this.userService.get(email);

    await compare(password, user.password).catch((e: Error) => {
      throw new ValidationError('Password not match', e);
    });

    delete user.password;
    const token = this.generateJWT(user.id, jwtOptions);

    return { user, token };
  }

  private generateJWT(
    id: string,
    jwtOptions: Partial<JWTOptions> = {}
  ): JWTToken {
    const { appSecret = 'Secret', expiresIn } = jwtOptions;
    const today = new Date();
    const exp = new Date();
    exp.setSeconds(today.getSeconds() + expiresIn);

    this.logger.debug(expiresIn);
    this.logger.debug(typeof expiresIn);
    const token = sign({ id }, appSecret, { expiresIn });
    console.log(token);

    return {
      token: 'Bearer ' + token,
      exp: exp.getTime(), // Convert time from millisecond to second
    };
  }
}
