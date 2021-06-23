import {
  BaseRepository,
  removeIdTransform,
  Repository,
} from '@cookingblog/express/api/mongoose';
import { Schema, Types } from 'mongoose';
import { IRecipeModel, IRecipeModelWithIngredient } from './recipe.entity';
import { IRecipeRepository } from './recipe.types';

const ObjectId = Types.ObjectId;

// Define the Recipe Schema
const RecipeSchema = new Schema<IRecipeModel>(
  {
    title: { type: String, required: true, unique: true },
    user: { type: ObjectId, ref: 'user', required: true },
    ingredients: [
      {
        ingredient: { type: ObjectId, ref: 'ingredient' },
        quantity: { type: Number },
        unit: { type: String },
        raw_data: { type: String },
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
    versionKey: false,
    toJSON: {
      versionKey: false,
      transform: removeIdTransform,
    },
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

  @Repository()
  async findById(id: string): Promise<IRecipeModelWithIngredient> {
    const recipes = ((await this.model
      .findById(id)
      .populate({
        path: 'ingredients',
        populate: {
          path: 'ingredient',
          select: 'name',
        },
      })
      .exec()) as unknown) as IRecipeModelWithIngredient;

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
