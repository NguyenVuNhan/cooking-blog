import {
  AddRecipeReq,
  AddRecipeRes,
  DeleteRecipeRes,
  GetRecipeRes,
  SearchRecipeRes,
  UpdateRecipeReq,
  UpdateRecipeRes,
} from '@cookingblog/api-interfaces';
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

    return res.data;
  })
);

export const updateRecipe = createAsyncThunk<
  UpdateRecipeRes['data'],
  { id: string; data: UpdateRecipeReq }
>(
  'recipe/update',
  storeUtils.withErrorHandler(async ({ id, data }) => {
    const res = await recipeServices.updateRecipe(id, data);

    return res.data;
  })
);

export const getRecipe = createAsyncThunk<GetRecipeRes['data'], string>(
  'recipe/get',
  storeUtils.withErrorHandler(async (data) => {
    const res = await recipeServices.getRecipe(data);

    return res.data;
  })
);

export const deleteRecipe = createAsyncThunk<DeleteRecipeRes['data'], string>(
  'recipe/delete',
  storeUtils.withErrorHandler(async (data) => {
    const res = await recipeServices.deleteRecipe(data);

    return res.data;
  })
);
