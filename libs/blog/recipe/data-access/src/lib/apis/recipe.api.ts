import {
  AddRecipeReq,
  AddRecipeRes,
  DeleteRecipeRes,
  ExtractRecipeRes,
  GetRandomRecipeRes,
  GetRecipeRes,
  SearchRecipeRes,
  UpdateRecipeReq,
  UpdateRecipeRes,
} from '@cookingblog/api/interfaces';
import {
  AuthState,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';
import { transformIngredients } from '@cookingblog/blog/recipe/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipeApi = createApi({
  reducerPath: 'api/recipe',
  tagTypes: ['Recipe'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/recipe',
    prepareHeaders: (header, api) => {
      const token = (api.getState()[AUTH_FEATURE_KEY] as AuthState).token;
      if (token) {
        header.set('Authorization', token);
      }
      return header;
    },
  }),
  endpoints: (builder) => ({
    // Search recipe
    searchRecipe: builder.query<SearchRecipeRes['data'], string>({
      query: (query) => `?query=${query}`,
      transformResponse: (response: SearchRecipeRes) => response.data,
      providesTags: (result) =>
        result
          ? [
              // Tags for fetched recipes
              ...result.recipes.map((recipe) => ({
                type: 'Recipe' as const,
                id: recipe.id,
              })),
              // Add this to force query to refetch
              { type: 'Recipe' as const, id: 'Update' },
            ]
          : ['Recipe'],
    }),

    // Get Recipe
    getRecipe: builder.query<GetRecipeRes['data'], string>({
      query: (query) => `/${query}`,
      transformResponse: (response: GetRecipeRes) => ({
        ...response.data,
        ingredients: transformIngredients(response.data.ingredients),
      }),
      providesTags: (result, _error, args) =>
        result ? [{ type: 'Recipe' as const, id: args }] : ['Recipe'],
    }),

    // Get random recipe
    getRandomRecipe: builder.query<GetRandomRecipeRes['data'], {}>({
      query: () => `/random`,
      transformResponse: (response: GetRecipeRes) => ({
        ...response.data,
        ingredients: transformIngredients(response.data.ingredients),
      }),
      providesTags: (result, _error, args) =>
        result ? [{ type: 'Recipe' as const, id: result.id }] : ['Recipe'],
    }),

    // Extract recipe
    extractRecipe: builder.query<ExtractRecipeRes['data'], string>({
      query: (query) => ({ url: `/extract`, params: { url: query } }),
      transformResponse: (response: ExtractRecipeRes) => response.data,
      keepUnusedDataFor: 60,
    }),

    // Delete recipe
    deleteRecipe: builder.mutation<DeleteRecipeRes['data'], string>({
      query: (query) => ({ url: `/${query}`, method: 'delete' }),
      transformResponse: (response: DeleteRecipeRes) => response.data,
    }),

    // Update recipe
    updateRecipe: builder.mutation<
      UpdateRecipeRes['data'],
      { id: string; body: UpdateRecipeReq }
    >({
      query: ({ id, body }) => ({ url: `/${id}`, method: 'post', body }),
      transformResponse: (response: UpdateRecipeRes) => response.data,
      invalidatesTags: (result, _error, args) =>
        result ? [{ type: 'Recipe' as const, id: args.id }] : ['Recipe'],
    }),

    // Add recipe
    addRecipe: builder.mutation<AddRecipeRes['data'], AddRecipeReq>({
      query: (body) => ({ url: '', method: 'post', body }),
      transformResponse: (response: GetRecipeRes) => response.data,
      invalidatesTags: [{ type: 'Recipe' as const, id: 'Update' }],
    }),
  }),
});

export const {
  useSearchRecipeQuery,
  useGetRecipeQuery,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
  useAddRecipeMutation,
  useExtractRecipeQuery,
  useLazyExtractRecipeQuery,
  useGetRandomRecipeQuery,
  useLazySearchRecipeQuery,
  usePrefetch,
} = recipeApi;
