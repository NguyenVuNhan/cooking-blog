import { genSalt, hash, compare } from 'bcrypt-nodejs';
import { createHash } from 'crypto';
import { model, Schema, Document } from 'mongoose';
import { IBaseRepository } from '@cookingblog/express/api/core';
import { BaseRepository, BaseEntity } from '@cookingblog/express/api/mongoose';

export interface IUser extends BaseEntity {
  name: string;
  email: string;
  password: string;
}

export interface IUserModel extends IUser, Document<string> {
  id: string;
  comparePassword(
    password: string,
    cb: (error: Error, result: boolean) => void
  ): string;
  gravatar(_size: number): string;
}

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
    versionKey: false,
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

const User = model<IUserModel>('User', UserSchema);

export interface IUserRepository extends IBaseRepository<IUserModel> {
  getByEmailOrName(emailOrName: string): Promise<IUserModel>;
}

export class UserRepository
  extends BaseRepository<IUserModel>
  implements IUserRepository {
  constructor() {
    super('user', UserSchema, 'users');
  }

  async getByEmailOrName(emailOrName: string): Promise<IUserModel> {
    return this.model.findOne({
      $or: [{ name: emailOrName }, { email: emailOrName }],
    });
  }
}

export default User;
