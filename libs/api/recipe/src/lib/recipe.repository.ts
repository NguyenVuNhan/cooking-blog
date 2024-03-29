import { TMeal } from '@cookingblog/api/recipe/dto';
import {
  BaseRepository,
  removeIdTransform,
  Repository,
} from '@cookingblog/express/api/mongoose';
import { FilterQuery, Schema, Types, _AllowStringsForIds } from 'mongoose';
import { IRecipe, IRecipeModel } from './recipe.entity';
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
    sourceUrl: { type: String },
    image: { type: String },
    typeOfMeal: {
      type: String,
      enum: ['breakfast', 'lunch', 'snack', 'dinner'],
    },
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
  implements IRecipeRepository
{
  constructor() {
    super('recipe', RecipeSchema, 'recipes');
  }

  @Repository()
  async getRandom(): Promise<IRecipeModel> {
    const count = await this.model.countDocuments();
    const random = Math.floor(Math.random() * count);

    const recipes = await this.model.findOne().skip(random);

    return recipes;
  }

  @Repository()
  async search(
    query: string,
    condition: Partial<IRecipe> = {}
  ): Promise<IRecipeModel[]> {
    return this.model
      .find(
        {
          $text: { $search: query },
          $and: [{ ...condition }],
        },
        { score: { $meta: 'textScore' } }
      )
      .sort('score');
  }
}
