import { IUserModel } from '@api/models';
import { ILogger } from '@cookingblog/express/api/common';
import { IUserService } from '../user/user.types';

export type JWTToken = { token: string; exp: number };
export type JWTOptions = { appSecret: string; expiresIn: number };

export interface IAuthService {
  /**
   * User login service
   *
   * @param {string} email user email
   * @param {string} password user password
   * @returns {IUserModel & JWTToken} user info and jwt token
   */
  login(
    email: string,
    password: string,
    jwtOptions?: JWTOptions
  ): Promise<{ user: IUserModel; token: JWTToken }>;
}

export type AuthServiceProp = {
  logger: ILogger;
  userService: IUserService;
};
