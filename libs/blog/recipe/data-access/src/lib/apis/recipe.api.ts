import {
  AddRecipeReq,
  AddRecipeRes,
  DeleteRecipeRes,
  GetRecipeRes,
  SearchRecipeRes,
  UpdateRecipeReq,
  UpdateRecipeRes,
  ExtractRecipeRes,
} from '@cookingblog/api/interfaces';
import {
  AuthState,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';
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
    getRecipe: builder.query<GetRecipeRes['data'], string>({
      query: (query) => `/${query}`,
      transformResponse: (response: GetRecipeRes) => {
        response.data.ingredients = response.data.ingredients.map((val) => ({
          ...val,
          ingredient: val.ingredient_name,
        }));
        return response.data;
      },
      providesTags: (result, _error, args) =>
        result ? [{ type: 'Recipe' as const, id: args }] : ['Recipe'],
    }),
    extractRecipe: builder.query<ExtractRecipeRes['data'], string>({
      query: (query) => ({ url: `/extract`, params: { url: query } }),
      transformResponse: (response: ExtractRecipeRes) => response.data,
      keepUnusedDataFor: 60,
    }),
    deleteRecipe: builder.mutation<DeleteRecipeRes['data'], string>({
      query: (query) => ({ url: `/${query}`, method: 'delete' }),
      transformResponse: (response: DeleteRecipeRes) => response.data,
    }),
    updateRecipe: builder.mutation<
      UpdateRecipeRes['data'],
      { id: string; body: UpdateRecipeReq }
    >({
      query: ({ id, body }) => ({ url: `/${id}`, method: 'post', body }),
      transformResponse: (response: UpdateRecipeRes) => response.data,
      invalidatesTags: (result, _error, args) =>
        result ? [{ type: 'Recipe' as const, id: args.id }] : ['Recipe'],
    }),
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
} = recipeApi;
