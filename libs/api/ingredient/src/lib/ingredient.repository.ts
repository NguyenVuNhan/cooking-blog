import {
  BaseRepository,
  removeIdTransform,
  Repository,
} from '@cookingblog/express/api/mongoose';
import { Schema } from 'mongoose';
import { IIngredientModel } from './ingredient.entity';
import { IIngredientRepository } from './ingredient.types';

// Define the Recipe Schema
const IngredientSchema = new Schema<IIngredientModel>(
  {
    name: { type: String, required: true },
    image: { type: String },
    possibleUnits: [{ type: String, required: true }],
    aisle: { type: String, required: true, default: '?' },
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

export class IngredientRepository
  extends BaseRepository<IIngredientModel>
  implements IIngredientRepository {
  constructor() {
    super('ingredient', IngredientSchema, 'ingredients');
  }

  @Repository()
  async searchByName(name: string) {
    return this.model
      .find({ name: { $regex: name } })
      .select('name')
      .limit(20);
  }
}
