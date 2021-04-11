import { Types, Schema, model } from 'mongoose';
import { RecipeModel } from '@cookingblog/api-interfaces';

const ObjectId = Types.ObjectId;

// Define the Recipe Schema
const RecipeSchema = new Schema<RecipeModel>(
  {
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

const Recipe = model<RecipeModel>('Recipe', RecipeSchema);

export default Recipe;
