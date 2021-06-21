import {
  BaseRepository,
  removeIdTransform,
} from '@cookingblog/express/api/mongoose';
import { Schema } from 'mongoose';
import { IRecipeRankModel } from './recipe-rank.entity';
import { IRecipeRankRepository } from './recipe-rank.type';

const RecipeRankSchema = new Schema<IRecipeRankModel>(
  {
    recipes: [
      {
        recipe: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'recipe',
        },
        recipe_name: {
          type: String,
          required: true,
        },
        last_visit: {
          type: Date,
          required: true,
        },
        view_count: {
          type: Number,
          required: true,
          default: 0,
        },
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

export class RecipeRankRepository
  extends BaseRepository<IRecipeRankModel>
  implements IRecipeRankRepository {
  constructor() {
    super('recipe-rank', RecipeRankSchema, 'recipes-rank');
  }
}
