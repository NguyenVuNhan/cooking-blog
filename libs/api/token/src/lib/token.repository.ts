import { BaseRepository } from '@cookingblog/express/api/mongoose';
import { Schema } from 'mongoose';
import { ITokenModel } from './token.entity';
import { ITokenRepository } from './token.types';

const TokenSchema = new Schema<ITokenModel>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600, // this is the expiry time in seconds
  },
});

export class TokenRepository
  extends BaseRepository<ITokenModel>
  implements ITokenRepository {
  constructor() {
    super('token', TokenSchema, 'tokens');
  }
}
