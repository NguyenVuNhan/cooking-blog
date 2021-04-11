import { IngredientModel } from '@cookingblog/api-interfaces';
import { Schema, model } from 'mongoose';

// Define the Recipe Schema
const IngredientSchema = new Schema<IngredientModel>(
  {
    name: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Ingredient = model<IngredientModel>('Ingredient', IngredientSchema);

export default Ingredient;
