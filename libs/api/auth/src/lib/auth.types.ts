import { IUserModel } from '@api/models';
import { IUserService } from '@cookingblog/api/user';
import { ILogger } from '@cookingblog/express/api/common';
import { BaseResponse } from '@cookingblog/express/api/core';
import { Match } from '@cookingblog/shared/validator-decorator';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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

// ======================================================================
// Request
// ======================================================================
export class LoginReq {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterReq {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  cpassword: string;
}

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
