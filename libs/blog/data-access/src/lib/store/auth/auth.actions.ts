import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from '@cookingblog/api-interfaces';
import { authServices } from '@cookingblog/shared/data-access/cooking-blog-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { storeUtils } from '@cookingblog/shared/web/utils';

export const login = createAsyncThunk<LoginRes['data'], LoginReq>(
  'auth/login',
  storeUtils.withErrorHandler(async (data) => {
    const res = await authServices.login(data);

    return res.data;
  })
);

export const register = createAsyncThunk<RegisterRes['data'], RegisterReq>(
  'auth/register',
  storeUtils.withErrorHandler(async (data) => {
    const res = await authServices.register(data);

    return res.data;
  })
);
