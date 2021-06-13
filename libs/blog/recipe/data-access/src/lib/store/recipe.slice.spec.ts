import {
  AddRecipeReq,
  AddRecipeRes,
  DeleteRecipeRes,
  GetRecipeRes,
  SearchRecipeRes,
  UpdateRecipeReq,
  UpdateRecipeRes,
} from '@cookingblog/api/interfaces';
import { IRecipe } from '@cookingblog/api/recipe';
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import * as recipeServices from './recipe.service';
import { recipeActions, recipeReducer } from './recipe.slice';

jest.mock('./recipe.service');

type RecipeServicesMockType = jest.Mocked<typeof recipeServices>;

describe('Recipe Reduce', () => {
  let recipeServicesMock: RecipeServicesMockType;

  beforeAll(() => {
    recipeServicesMock = recipeServices as RecipeServicesMockType;
  });

  afterAll(() => {
    jest.unmock('@cookingblog/shared/data-access/cooking-blog-api');
  });

  it('should handle initial state', () => {
    const expected = {
      loading: false,
      recipes: [],
    };
    expect(recipeReducer(undefined, { type: '' })).toEqual(expected);
  });

  describe('searchRecipe', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let action: AsyncThunkAction<SearchRecipeRes['data'], string, {}>;

    let dispatch: Dispatch; // Create the "spy" properties
    let getState: () => unknown;

    let arg: string;
    let result: SearchRecipeRes;

    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn();
      getState = jest.fn();

      recipeServicesMock.search.mockClear();
      recipeServicesMock.search.mockResolvedValue(result);

      arg = 'My recipe';
      result = {
        data: { recipes: [] },
        message: 'message',
        success: true,
      };

      action = recipeActions.searchRecipe(arg);
    });

    it('should call the api correctly', async () => {
      await action(dispatch, getState, undefined);
      expect(recipeServices.search).toHaveBeenCalledWith(arg);
    });

    it('should update store', async () => {
      const expected = {
        loading: false,
        recipes: [],
      };
      expect(
        recipeReducer(undefined, {
          type: recipeActions.searchRecipe.fulfilled.toString(),
          payload: { recipes: [] },
        })
      ).toEqual(expected);
    });
  });

  describe('addRecipe', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let action: AsyncThunkAction<AddRecipeRes['data'], AddRecipeReq, {}>;

    let dispatch: Dispatch; // Create the "spy" properties
    let getState: () => unknown;

    let arg: AddRecipeReq;
    let result: AddRecipeRes;

    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn();
      getState = jest.fn();

      recipeServicesMock.addRecipe.mockClear();
      recipeServicesMock.addRecipe.mockResolvedValue(result);

      arg = {
        title: 'New recipe',
        steps: [],
        duration: '',
        ingredients: [],
      };
      result = {
        data: { title: 'New recipe', id: '' },
        message: 'message',
        success: true,
      };

      action = recipeActions.addRecipe(arg);
    });

    it('should call the api correctly', async () => {
      await action(dispatch, getState, undefined);
      expect(recipeServices.addRecipe).toHaveBeenCalledWith(arg);
    });

    it('should update store', async () => {
      const expected = {
        loading: false,
        recipes: [],
      };
      expect(
        recipeReducer(undefined, {
          type: recipeActions.addRecipe.fulfilled.toString(),
          payload: { recipes: [] },
        })
      ).toEqual(expected);
    });
  });

  describe('updateRecipe', () => {
    let action: AsyncThunkAction<
      UpdateRecipeRes['data'],
      { id: string; data: UpdateRecipeReq },
      // eslint-disable-next-line @typescript-eslint/ban-types
      {}
    >;

    let dispatch: Dispatch; // Create the "spy" properties
    let getState: () => unknown;

    let arg: { id: string; data: UpdateRecipeReq };
    let result: UpdateRecipeRes;

    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn();
      getState = jest.fn();

      recipeServicesMock.updateRecipe.mockClear();
      recipeServicesMock.updateRecipe.mockResolvedValue(result);

      arg = {
        id: '',
        data: {
          title: 'New recipe',
          steps: [],
          duration: '',
          ingredients: [],
        },
      };
      result = {
        data: { title: 'New recipe', id: '' },
        message: 'message',
        success: true,
      };

      action = recipeActions.updateRecipe(arg);
    });

    it('should call the api correctly', async () => {
      await action(dispatch, getState, undefined);
      expect(recipeServices.updateRecipe).toHaveBeenCalledWith(
        arg.id,
        arg.data
      );
    });
  });

  describe('getRecipe', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let action: AsyncThunkAction<IRecipe, string, {}>;

    let dispatch: Dispatch; // Create the "spy" properties
    let getState: () => unknown;

    let arg: string;
    let result: GetRecipeRes;

    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn();
      getState = jest.fn();

      recipeServicesMock.getRecipe.mockClear();
      recipeServicesMock.getRecipe.mockResolvedValue(result);

      arg = 'id';
      result = {
        data: {
          id: 'id',
          user: '',
          duration: '',
          ingredients: [],
          ingredientsStr: '',
          steps: [],
          title: 'New recipe',
          createdAt: '',
          updatedAt: '',
        },
        message: 'message',
        success: true,
      };

      action = recipeActions.getRecipe(arg);
    });

    it('should call the api correctly', async () => {
      await action(dispatch, getState, undefined);
      expect(recipeServices.getRecipe).toHaveBeenCalledWith(arg);
    });

    it('should get store', async () => {
      const expected = {
        loading: false,
        recipe: result.data,
        recipes: [],
      };
      expect(
        recipeReducer(undefined, {
          type: recipeActions.getRecipe.fulfilled.toString(),
          payload: result.data,
        })
      ).toEqual(expected);
    });
  });

  describe('deleteRecipe', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let action: AsyncThunkAction<DeleteRecipeRes['data'], string, {}>;

    let dispatch: Dispatch; // Create the "spy" properties
    let getState: () => unknown;

    let arg: string;
    let result: DeleteRecipeRes;

    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn();
      getState = jest.fn();

      recipeServicesMock.deleteRecipe.mockClear();
      recipeServicesMock.deleteRecipe.mockResolvedValue(result);

      arg = 'id';
      result = {
        data: { id: 'id' },
        message: 'message',
        success: true,
      };

      action = recipeActions.deleteRecipe(arg);
    });

    it('should call the api correctly', async () => {
      await action(dispatch, getState, undefined);
      expect(recipeServices.deleteRecipe).toHaveBeenCalledWith(arg);
    });
  });
});
