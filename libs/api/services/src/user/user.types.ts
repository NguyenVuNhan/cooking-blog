import { IUserRepository, IUser, IUserModel } from '@api/models';
import { ILogger } from '@cookingblog/express/api/common';
import { ServiceCache, IBaseService } from '@cookingblog/express/api/core';

export type UserServiceProp = {
  repo: IUserRepository;
  logger: ILogger;
  serviceCache: ServiceCache;
};

export interface IUserService extends IBaseService<IUser> {
  /**
   * Get user service
   *
   * @param {string} email user email
   * @return {Promise} Promise object of IUserModel
   */
  get(email: string): Promise<IUserModel>;
}
