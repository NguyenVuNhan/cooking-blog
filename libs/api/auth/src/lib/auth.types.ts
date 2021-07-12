import { IUserModel, IUserService } from '@cookingblog/api/user';
import { ITokenService } from '@cookingblog/api/token';
import { ILogger } from '@cookingblog/express/api/common';
import { ConnectionOptions } from 'bullmq/dist/interfaces';

export type JWTToken = { token: string; exp: number };
export type JWTOptions = { appSecret: string; expiresIn: number };

// ======================================================================
// Service
// ======================================================================
export type AuthServiceProp = {
  logger: ILogger;
  userService: IUserService;
  tokenService: ITokenService;
  connection: ConnectionOptions;
};

export interface IAuthService {
  /**
   * User login service
   *
   * @param {string} emailOrName user email
   * @param {string} password user password
   * @returns {IUserModel & JWTToken} user info and jwt token
   */
  login(
    emailOrName: string,
    password: string,
    jwtOptions?: JWTOptions
  ): Promise<JWTToken & { user: IUserModel }>;

  /**
   * User register service
   *
   * @param {string} name user name
   * @param {string} email user email
   * @param {string} password user password
   * @returns {IUserModel} new user info
   */
  register(name: string, email: string, password: string): Promise<IUserModel>;

  /**
   * Password reset request
   *
   * @param {string} email user email
   * @param {string} baseUrl The base url of the app
   * @returns {Promise<void>}
   */
  resetRequest(email: string, baseUrl: string): Promise<void>;

  /**
   * Reset user password
   *
   * @param {string} userId user id
   * @param {string} token The password reset token
   * @param {string} password The new password
   * @returns {Promise<boolean>}
   */
  reset(user: string, token: string, password: string): Promise<boolean>;
}
