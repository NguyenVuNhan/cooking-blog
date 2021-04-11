import { IIngredientModel } from '@cookingblog/api-interfaces';
import { Schema, model } from 'mongoose';

// Define the Recipe Schema
const IngredientSchema = new Schema<IIngredientModel>(
  {
    name: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Ingredient = model<IIngredientModel>('Ingredient', IngredientSchema);

export default Ingredient;
