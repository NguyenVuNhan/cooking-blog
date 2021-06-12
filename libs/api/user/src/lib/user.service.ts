import {
  AlreadyExistsError,
  NotFoundError,
} from '@cookingblog/express/api/common';
import { BaseService } from '@cookingblog/express/api/core';
import { IUserModel } from './user.entity';
import { IUserRepository, IUserService, UserServiceProp } from './user.types';

export class UserService
  extends BaseService<IUserModel>
  implements IUserService {
  repo: IUserRepository;

  constructor({ repo, logger, serviceCache }: UserServiceProp) {
    super(repo, serviceCache, logger);
  }

  async get(emailOrName: string, throwOnFound = false): Promise<IUserModel> {
    const user = await this.repo.getByEmailOrName(emailOrName);
    if (!user && !throwOnFound) throw new NotFoundError('User Not Found');
    else if (user && throwOnFound)
      throw new AlreadyExistsError('User already exists');
    return user;
  }

  async getByName(name: string, throwOnFound = false): Promise<IUserModel> {
    const user = await this.findOne({ name });
    if (!user && !throwOnFound)
      throw new NotFoundError(`User ${name} Not Found`);
    else if (user && throwOnFound)
      throw new AlreadyExistsError(`User name ${name} already exists`);
    return user;
  }

  async getByEmail(email: string, throwOnFound = false): Promise<IUserModel> {
    const user = await this.findOne({ email });
    if (!user && !throwOnFound)
      throw new NotFoundError('User with email ${email} Not Found');
    else if (user && throwOnFound)
      throw new AlreadyExistsError(`User email ${email} already exists`);
    return user;
  }
}
