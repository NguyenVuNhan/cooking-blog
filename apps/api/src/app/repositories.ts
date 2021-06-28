import { IngredientRepository } from '@cookingblog/api/ingredient';
import { RecipeRepository } from '@cookingblog/api/recipe';
import { UserRepository } from '@cookingblog/api/user';

export const userRepository = new UserRepository();
export const ingredientRepository = new IngredientRepository();
export const recipeRepository = new RecipeRepository();
