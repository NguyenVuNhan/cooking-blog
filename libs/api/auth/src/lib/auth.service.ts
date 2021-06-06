import { IUserModel, IUserService } from '@cookingblog/api/user';
import { ILogger, ValidationError } from '@cookingblog/express/api/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  AuthServiceProp,
  IAuthService,
  JWTOptions,
  JWTToken,
} from './auth.types';

export class AuthService implements IAuthService {
  logger: ILogger;
  userService: IUserService;

  constructor({ logger, userService }: AuthServiceProp) {
    this.logger = logger;
    this.userService = userService;
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
  ): Promise<{ user: IUserModel; token: JWTToken }> {
    const user = await this.userService.get(email);

    if (!(await compare(password, user.password)))
      throw new ValidationError('Password not match');

    user.password = undefined;
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

    const token = sign({ id }, appSecret, { expiresIn });

    return {
      token: 'Bearer ' + token,
      exp: exp.getTime(), // Convert time from millisecond to second
    };
  }
}
