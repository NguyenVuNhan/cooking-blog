import { IUserModel } from '@cookingblog/api-interfaces';
import bcrypt from 'bcrypt-nodejs';
import { createHash } from 'crypto';
import { model, Schema } from 'mongoose';

// Define the User Schema
const UserSchema = new Schema<IUserModel>(
  {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

// Password hash middleware
UserSchema.pre<IUserModel>('save', function (next) {
  if (!this.isModified('password')) {
    return next(null);
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(this.password, salt, null, (err, _hash) => {
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
  bcrypt.compare(requestPassword, this.password, (err, isMatch) => {
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

export default User;
