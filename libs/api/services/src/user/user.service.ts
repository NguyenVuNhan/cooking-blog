import { IUserModel, IUserRepository } from '@api/models';
import { NotFoundError } from '@cookingblog/express/api/common';
import { BaseService } from '@cookingblog/express/api/core';
import { IUserService, UserServiceProp } from './user.types';

export default class UserService
  extends BaseService<IUserModel>
  implements IUserService {
  repo: IUserRepository;

  constructor({ repo, logger, serviceCache }: UserServiceProp) {
    super(repo, serviceCache, logger);
  }

  async get(email: string): Promise<IUserModel> {
    const user = await this.findOne({ email });
    if (!user) throw new NotFoundError('User Not Found');

    return user;
  }
}
