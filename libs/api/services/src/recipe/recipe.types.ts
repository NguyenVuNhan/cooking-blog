import { IRecipeRepository, IUserModel, IUserRepository } from '@api/models';
import { IRecipeModel } from '@cookingblog/api-interfaces';
import { ILogger } from '@cookingblog/express/api/common';
import { IBaseService, ServiceCache } from '@cookingblog/express/api/core';

export type UserServiceProp = {
  repo: IRecipeRepository;
  logger: ILogger;
  serviceCache: ServiceCache;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRecipeService extends IBaseService<IRecipeModel> {}
