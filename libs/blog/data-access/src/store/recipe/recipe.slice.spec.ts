import { fetchRecipe, recipeAdapter, recipeReducer } from './recipe.slice';

describe('recipe reducer', () => {
  it('should handle initial state', () => {
    const expected = recipeAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(recipeReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchRecipes', () => {
    let state = recipeReducer(undefined, fetchRecipe.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = recipeReducer(
      state,
      fetchRecipe.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = recipeReducer(
      state,
      fetchRecipe.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
