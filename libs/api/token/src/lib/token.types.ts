import { ILogger } from '@cookingblog/express/api/common';
import { IUserService } from '@cookingblog/api/user';
import {
  IBaseRepository,
  IBaseService,
  ServiceCache,
} from '@cookingblog/express/api/core';
import { ITokenModel } from './token.entity';

// ======================================================================
// Repository
// ======================================================================
export type ITokenRepository = IBaseRepository<ITokenModel>;

// ======================================================================
// Service
// ======================================================================
export type TokenServiceProp = {
  repo: ITokenRepository;
  logger: ILogger;
  serviceCache: ServiceCache;
  userService: IUserService;
};

export interface GeneratedToken {
  resetToken: string;
  user: string;
}

export interface ITokenService extends IBaseService<ITokenModel> {
  /**
   * generate Token for password reset
   *
   * @param {string} email the user email
   * @return {Promise<GeneratedToken>} Promise string of token
   */
  generate(email: string): Promise<GeneratedToken>;
}
