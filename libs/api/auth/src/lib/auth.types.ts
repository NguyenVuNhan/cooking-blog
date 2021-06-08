import { IUserModel } from '@api/models';
import { ILogger } from '@cookingblog/express/api/common';
import { IUserService } from '@cookingblog/api/user';

export type JWTToken = { token: string; exp: number };
export type JWTOptions = { appSecret: string; expiresIn: number };

export type AuthServiceProp = {
  logger: ILogger;
  userService: IUserService;
};

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
  /**
   * User register service
   *
   * @param {string} name user name
   * @param {string} email user email
   * @param {string} password user password
   * @returns {IUserModel} new user info
   */
  register(name: string, email: string, password: string): Promise<IUserModel>;
}