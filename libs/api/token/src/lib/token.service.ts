import { IUserService } from '@cookingblog/api/user';
import { BaseService } from '@cookingblog/express/api/core';
import { randomBytes } from 'crypto';
import { ITokenModel } from './token.entity';
import {
  GeneratedToken,
  ITokenRepository,
  ITokenService,
  TokenServiceProp,
} from './token.types';

export class TokenService
  extends BaseService<ITokenModel>
  implements ITokenService {
  repo: ITokenRepository;
  private userService: IUserService;

  constructor({ repo, logger, serviceCache, userService }: TokenServiceProp) {
    super(repo, serviceCache, logger);
    this.userService = userService;
  }

  async generate(email: string): Promise<GeneratedToken> {
    const user = await this.userService.getByEmail(email);

    const token = await this.findOne({ user: user.id });
    if (token) {
      await this.deleteById(token.id);
    }

    const resetToken = randomBytes(32).toString('hex');
    await this.create({
      user: user.id,
      token: resetToken,
      createAt: new Date(),
    });

    return { resetToken, user: user.id };
  }
}
