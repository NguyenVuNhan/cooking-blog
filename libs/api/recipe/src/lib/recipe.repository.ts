import { BaseRepository } from '@cookingblog/express/api/mongoose';
import { Schema, Types } from 'mongoose';
import { IRecipeModel } from './recipe.entity';
import { IRecipeRepository } from './recipe.types';

const ObjectId = Types.ObjectId;

// Define the Recipe Schema
const RecipeSchema = new Schema<IRecipeModel>(
  {
    title: { type: String, required: true, unique: true },
    user: { type: ObjectId, ref: 'user', required: true },
    course: { type: String },
    ingredients: [
      {
        ingredient: { type: ObjectId, ref: 'ingredient' },
        quantity: { type: String },
      },
    ],
    ingredientsStr: { type: String },
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
  }
);

// Define indexes for full test search
RecipeSchema.index(
  {
    title: 'text',
    'steps.description': 'text',
    ingredientsStr: 'text',
  },
  {
    title: 10,
    'steps.description': 2,
    ingredientsStr: 5,
  }
);

export class RecipeRepository
  extends BaseRepository<IRecipeModel>
  implements IRecipeRepository {
  constructor() {
    super('recipe', RecipeSchema, 'recipes');
  }

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
