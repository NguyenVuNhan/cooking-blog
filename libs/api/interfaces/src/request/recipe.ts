import { IRecipe } from '../data/recipe';

export type AddRecipeReq = Omit<IRecipe, '_id' | 'user'>;

export type UpdateRecipeReq = Partial<AddRecipeReq>;
