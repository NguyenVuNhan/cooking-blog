import {
  AddRecipeReq,
  AddRecipeRes,
  DeleteRecipeRes,
  ErrorRes,
  SearchRecipeRes,
  UpdateRecipeReq,
  UpdateRecipeRes,
} from '@cookingblog/api/interfaces';
import { IRecipe } from '@cookingblog/api/recipe';
import {
  AuthState,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';
import { forwardTo, goBack } from '@cookingblog/blog/utils';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  withErrorHandler,
} from '@cookingblog/shared/web/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as recipeServices from './recipe.service';

export const RECIPE_FEATURE_KEY = 'recipe';

// ======================================================================
// Actions
// ======================================================================
export const searchRecipe = createAsyncThunk<SearchRecipeRes['data'], string>(
  'recipe/search',
  withErrorHandler(async (query) => {
    const res = await recipeServices.search(query);

    return res.data;
  })
);

export const addRecipe = createAsyncThunk<AddRecipeRes['data'], AddRecipeReq>(
  'recipe/add',
  withErrorHandler(async (data) => {
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
  withErrorHandler(async ({ id, data }, thunkAPI) => {
    const res = await recipeServices.updateRecipe(id, data);

    thunkAPI.dispatch(getRecipe(id));
    return res.data;
  })
);

export const getRecipe = createAsyncThunk<IRecipe, string>(
  'recipe/get',
  withErrorHandler(async (data) => {
    const res = await recipeServices.getRecipe(data);

    const recipe: IRecipe = {
      ...res.data,
      ingredients: res.data.ingredients.map(({ ingredient, ...rest }) => ({
        ingredient: ingredient.name,
        ...rest,
      })),
    };

    return recipe;
  })
);

export const deleteRecipe = createAsyncThunk<DeleteRecipeRes['data'], string>(
  'recipe/delete',
  withErrorHandler(async (data) => {
    const res = await recipeServices.deleteRecipe(data);

    goBack();
    return res.data;
  })
);

// ======================================================================
// Slice
// ======================================================================
export interface RecipeState {
  recipe?: IRecipe;
  recipes: SearchRecipeRes['data']['recipes'];
  loading: boolean;
  errors?: ErrorRes;
}

export const recipeSlice = createSlice({
  name: RECIPE_FEATURE_KEY,
  initialState: {
    loading: false,
    recipes: [],
  } as RecipeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipe.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
      })
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.recipe = action.payload;
      })
      .addMatcher(isFulfilledAction(RECIPE_FEATURE_KEY), (state) => {
        state.errors = undefined;
        state.loading = false;
      })
      .addMatcher(isPendingAction(RECIPE_FEATURE_KEY), (state) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction(RECIPE_FEATURE_KEY), (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const recipeReducer = recipeSlice.reducer;
export const recipeActions = {
  ...recipeSlice.actions,
  searchRecipe,
  addRecipe,
  updateRecipe,
  getRecipe,
  deleteRecipe,
};

// ======================================================================
// Selector
// ======================================================================
export const getRecipeState = (rootState: unknown) =>
  rootState[RECIPE_FEATURE_KEY];

export const getCurrentRecipe = (rootState: unknown) =>
  (rootState[RECIPE_FEATURE_KEY] as RecipeState).recipe;

export const getRecipes = (rootState: unknown) =>
  (rootState[RECIPE_FEATURE_KEY] as RecipeState).recipes;

export const getErrors = (rootState: unknown) =>
  (rootState[RECIPE_FEATURE_KEY] as RecipeState).errors;

export const getLoadingStatus = (rootState: unknown) =>
  (rootState[RECIPE_FEATURE_KEY] as RecipeState).loading;

export const getOwnerStatus = (rootState: unknown) => {
  const owner = (rootState[RECIPE_FEATURE_KEY] as RecipeState).recipe?.user;
  const currentUser = (rootState[AUTH_FEATURE_KEY] as AuthState).user?.id;

  return owner === currentUser;
};
