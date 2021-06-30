import { AuthService } from '@cookingblog/api/auth';
import { IngredientService } from '@cookingblog/api/ingredient';
import { RecipeService } from '@cookingblog/api/recipe';
import { SpoonacularIngredientsService } from '@cookingblog/api/spoonacular/ingredients';
import { SpoonacularRecipesService } from '@cookingblog/api/spoonacular/recipes';
import { UserService } from '@cookingblog/api/user';
import { ServiceCache } from '@cookingblog/express/api/core';
import { TokenService } from '@cookingblog/api/token';
import { cache } from './cache';
import {
  userRepository,
  ingredientRepository,
  recipeRepository,
  tokenRepository,
} from './repositories';
import { environment as config } from '../environments/environment';
import { logger } from './logger';
import { connection } from './cache';

const serviceCache: ServiceCache = {
  cache,
  appName: config.appName,
  uniqueKey: config.redisPrefix,
  second: config.redisTimeout,
};

// spoonacular services
export const spoonacularIngredientsService = new SpoonacularIngredientsService({
  apiKeys: config.spoonacularApiKeys,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'spoonacular_ingredients' },
});
export const spoonacularRecipesService = new SpoonacularRecipesService({
  apiKeys: config.spoonacularApiKeys,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'spoonacular_recipes' },
});

// cooking blog services
export const userService = new UserService({
  repo: userRepository,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'user' },
});
export const tokenService = new TokenService({
  repo: tokenRepository,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'token' },
  userService,
});
export const authService = new AuthService({
  logger,
  userService,
  tokenService,
  connection,
});
export const ingredientService = new IngredientService({
  repo: ingredientRepository,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'ingredient' },
});
export const recipeService = new RecipeService({
  repo: recipeRepository,
  ingredientService,
  spoonacularRecipesService,
  spoonacularIngredientsService,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'recipe' },
});
