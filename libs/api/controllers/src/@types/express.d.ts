import { IUserModel } from '@cookingblog/api-interfaces';
import { APIConfig } from '@cookingblog/api-interfaces';

declare global {
  namespace Express {
    interface User extends IUserModel {
      id: string;
    }

    interface Request {
      user: User;
      locals: string;
    }
  }
}
