import { IUserModel, IUserService } from '@cookingblog/api/user';
import { ILogger } from '@cookingblog/express/api/common';
import { BaseResponse } from '@cookingblog/express/api/core';
import { LoginDTO, RegisterDTO } from './auth.dto';

export type JWTToken = { token: string; exp: number };
export type JWTOptions = { appSecret: string; expiresIn: number };

// ======================================================================
// Service
// ======================================================================
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
}

// ======================================================================
// Request
// ======================================================================
export type LoginReq = LoginDTO;
export type RegisterReq = RegisterDTO;

// ======================================================================
// Response
// ======================================================================
export type LoginRes = BaseResponse<{
  user: { id: string; email: string };
  token: { token: string; exp: number };
}>;

export type RegisterRes = BaseResponse<{
  email: string;
}>;
