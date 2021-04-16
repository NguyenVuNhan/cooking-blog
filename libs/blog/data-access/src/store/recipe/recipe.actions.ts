import {
  AddRecipeReq,
  AddRecipeRes,
  DeleteRecipeRes,
  IRecipe,
  SearchRecipeRes,
  UpdateRecipeReq,
  UpdateRecipeRes,
} from '@cookingblog/api-interfaces';
import { forwardTo, goBack } from '@cookingblog/blog/utils';
import { recipeServices } from '@cookingblog/shared/data-access/cooking-blog-api';
import { storeUtils } from '@cookingblog/shared/web/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const searchRecipe = createAsyncThunk<SearchRecipeRes['data'], string>(
  'recipe/search',
  storeUtils.withErrorHandler(async (query) => {
    const res = await recipeServices.search(query);

    return res.data;
  })
);

export const addRecipe = createAsyncThunk<AddRecipeRes['data'], AddRecipeReq>(
  'recipe/add',
  storeUtils.withErrorHandler(async (data) => {
    const res = await recipeServices.addRecipe(data);

    forwardTo('/');
    forwardTo(`/recipe/${res.data.id}`);
    return res.data;
  })
);

export const updateRecipe = createAsyncThunk<
  UpdateRecipeRes['data'],
  { id: string; data: UpdateRecipeReq }
>(
  'recipe/update',
  storeUtils.withErrorHandler(async ({ id, data }, thunkAPI) => {
    const res = await recipeServices.updateRecipe(id, data);

    thunkAPI.dispatch(getRecipe(id));
    return res.data;
  })
);

export const getRecipe = createAsyncThunk<IRecipe, string>(
  'recipe/get',
  storeUtils.withErrorHandler(async (data) => {
    const res = await recipeServices.getRecipe(data);

    const recipe: IRecipe = {
      ...res.data,
      ingredients: res.data.ingredients.map(({ ingredient, quantity }) => ({
        ingredient: ingredient.name,
        quantity,
      })),
    };

    return recipe;
  })
);

export const deleteRecipe = createAsyncThunk<DeleteRecipeRes['data'], string>(
  'recipe/delete',
  storeUtils.withErrorHandler(async (data) => {
    const res = await recipeServices.deleteRecipe(data);

    goBack();
    return res.data;
  })
);
