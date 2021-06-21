import {
  BaseRepository,
  removeIdTransform,
} from '@cookingblog/express/api/mongoose';
import { Schema } from 'mongoose';
import { IMealPlannerModel } from './meal-planner.entity';
import { IMealPlannerRepository } from './meal-planner.types';

const MealPlannerSchema = new Schema<IMealPlannerModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    year: {
      type: Number,
      required: true,
    },
    events: [
      {
        timestamp: {
          type: Date,
          required: true,
        },
        recipe: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'recipe',
        },
        recipeName: {
          type: String,
          required: true,
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

export class MealPlannerRepository
  extends BaseRepository<IMealPlannerModel>
  implements IMealPlannerRepository {
  constructor() {
    super('meal-planner', MealPlannerSchema, 'meals-planner');
  }
}
