import { Types, Schema, model } from 'mongoose';
import { IRecipeModel } from '@cookingblog/api-interfaces';
import { IBaseRepository } from '@cookingblog/express/api/core';
import { BaseRepository } from '@cookingblog/express/api/mongoose';

const ObjectId = Types.ObjectId;

// Define the Recipe Schema
const RecipeSchema = new Schema<IRecipeModel>(
  {
    title: { type: String, required: true, unique: true },
    user: { type: ObjectId, ref: 'User', required: true },
    course: { type: String },
    ingredients: [
      {
        ingredient: { type: ObjectId, ref: 'Ingredient' },
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

const Recipe = model<IRecipeModel>('Recipe', RecipeSchema);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRecipeRepository extends IBaseRepository<IRecipeModel> {}

export class RecipeRepository
  extends BaseRepository<IRecipeModel>
  implements IRecipeRepository {
  constructor() {
    super('recipe', RecipeSchema, 'recipes');
  }
}

export default Recipe;
