import { IngredientRepository } from '@cookingblog/api/ingredient';
import { RecipeRepository } from '@cookingblog/api/recipe';
import { TokenRepository } from '@cookingblog/api/token';
import { UserRepository } from '@cookingblog/api/user';

export const userRepository = new UserRepository();
export const tokenRepository = new TokenRepository();
export const ingredientRepository = new IngredientRepository();
export const recipeRepository = new RecipeRepository();
