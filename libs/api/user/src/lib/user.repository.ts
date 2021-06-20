import {
  BaseRepository,
  removeIdTransform,
  Repository,
} from '@cookingblog/express/api/mongoose';
import { compare, genSalt, hash } from 'bcrypt-nodejs';
import { createHash } from 'crypto';
import { Schema } from 'mongoose';
import { IUserModel } from './user.entity';
import { IUserRepository } from './user.types';

// Define the User Schema
const UserSchema = new Schema<IUserModel>(
  {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
    autoCreate: true,
    toJSON: {
      versionKey: false,
      transform: removeIdTransform,
    },
  }
);

// Password hash middleware
UserSchema.pre<IUserModel>('save', function (next) {
  if (!this.isModified('password')) {
    return next(null);
  }

  genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    hash(this.password, salt, null, (err, _hash) => {
      if (err) {
        return next(err);
      }

      this.password = _hash;
      return next(null);
    });
  });
});

// Compares the user's password with the request password
UserSchema.methods.comparePassword = function (
  requestPassword: string,
  cb: (error: Error, result: boolean) => void
): void {
  compare(requestPassword, this.password, (err, isMatch) => {
    return cb(err, isMatch);
  });
};

// User's gravatar
UserSchema.methods.gravatar = function (size: number): string {
  if (!size) {
    size = 200;
  }

  const url = 'https://gravatar.com/avatar';
  if (!this.email) {
    return `${url}/?s=${size}&d=retro`;
  }

  const md5 = createHash('md5').update(this.email).digest('hex');
  return `${url}/${md5}?s=${size}&d=retro`;
};

export class UserRepository
  extends BaseRepository<IUserModel>
  implements IUserRepository {
  constructor() {
    super('user', UserSchema, 'users');
  }

  @Repository()
  async getByEmailOrName(emailOrName: string): Promise<IUserModel> {
    return this.model.findOne({
      $or: [{ name: emailOrName }, { email: emailOrName }],
    });
  }
}
