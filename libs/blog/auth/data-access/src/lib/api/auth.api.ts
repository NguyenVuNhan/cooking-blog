import {
  PasswordResetReq,
  PasswordResetRequestRes,
  PasswordResetRes,
  RegisterReq,
  RegisterRes,
} from '@cookingblog/api/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'api/auth',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (builder) => ({
    passwordResetRequest: builder.query<PasswordResetRequestRes, string>({
      query: (query) => ({
        url: '/reset-password',
        params: { mail: query },
      }),
    }),

    passwordReset: builder.mutation<PasswordResetRes, PasswordResetReq>({
      query: (query) => ({
        url: '/reset-password',
        method: 'POST',
        body: query,
      }),
    }),

    register: builder.mutation<RegisterRes, RegisterReq>({
      query: (query) => ({
        url: '/register',
        method: 'POST',
        body: query,
      }),
    }),
  }),
});

export const {
  useLazyPasswordResetRequestQuery,
  usePasswordResetMutation,
  useRegisterMutation,
} = authApi;
