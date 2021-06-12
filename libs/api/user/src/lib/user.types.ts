import { ILogger } from '@cookingblog/express/api/common';
import {
  IBaseRepository,
  IBaseService,
  ServiceCache,
} from '@cookingblog/express/api/core';
import { IUserModel } from './user.entity';

// ======================================================================
// Repository
// ======================================================================
export interface IUserRepository extends IBaseRepository<IUserModel> {
  /**
   * Get user by email or name
   *
   * @param  {string} emailOrName user email or name
   * @return {IUserModel} Promise resolved user with given email or name
   */
  getByEmailOrName(emailOrName: string): Promise<IUserModel>;
}

// ======================================================================
// Service
// ======================================================================
export type UserServiceProp = {
  repo: IUserRepository;
  logger: ILogger;
  serviceCache: ServiceCache;
};

export interface IUserService extends IBaseService<IUserModel> {
  /**
   * Get user service
   *
   * @param {string} emailOrName user email or name
   * @param {boolean} throwOnFound if this set to true, throw error when user found. Default is found
   * @return {Promise} Promise object of IUserModel
   */
  get(emailOrName: string, throwOnFound?: boolean): Promise<IUserModel>;

  /**
   * Get user by name service
   *
   * @param {string} name user name
   * @param {boolean} throwOnFound if this set to true, throw error when user found. Default is found
   * @return {Promise} Promise object of IUserModel
   */
  getByName(name: string, throwOnFound?: boolean): Promise<IUserModel>;

  /**
   * Get user by email service
   *
   * @param {string} email user email
   * @param {boolean} throwOnFound if this set to true, throw error when user found. Default is found
   * @return {Promise} Promise object of IUserModel
   */
  getByEmail(email: string, throwOnFound?: boolean): Promise<IUserModel>;
}
