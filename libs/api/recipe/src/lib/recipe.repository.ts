import {
  BaseRepository,
  removeIdTransform,
  Repository,
} from '@cookingblog/express/api/mongoose';
import { Schema, Types } from 'mongoose';
import { IRecipeModel } from './recipe.entity';
import { IRecipeRepository } from './recipe.types';

const ObjectId = Types.ObjectId;

// Define the Recipe Schema
const RecipeSchema = new Schema<IRecipeModel>(
  {
    title: { type: String, required: true, unique: true },
    user: { type: ObjectId, ref: 'user', required: true },
    serving: { type: String, required: true, default: 1 },
    ingredientsStr: { type: String },
    ingredients: [
      {
        ingredient: { type: ObjectId, ref: 'ingredient' },
        ingredient_name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String },
        raw_data: { type: String, required: true },
      },
    ],
    duration: { type: String, required: true },
    steps: [
      {
        description: { type: String, required: true },
        duration: { type: String },
        ingredients: [String],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      versionKey: false,
      transform: removeIdTransform,
    },
  }
);

RecipeSchema.index(
  {
    title: 'text',
    'steps.description': 'text',
    ingredientsStr: 'text',
  },
  {
    weights: {
      title: 10,
      'steps.description': 2,
      ingredientsStr: 5,
    },
  }
);

export class RecipeRepository
  extends BaseRepository<IRecipeModel>
  implements IRecipeRepository {
  constructor() {
    super('recipe', RecipeSchema, 'recipes');
  }

  @Repository()
  async findById(id: string): Promise<IRecipeModel> {
    const recipes = ((await this.model
      .findById(id)
      .exec()) as unknown) as IRecipeModel;

    return recipes;
  }

  @Repository()
  async search(query: string): Promise<IRecipeModel[]> {
    return this.model
      .find(
        {
          $text: { $search: query },
        },
        { score: { $meta: 'textScore' } }
      )
      .sort('score');
  }
}
