import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from '@cookingblog/api-interfaces';
import { authServices } from '@cookingblog/shared/data-access/cooking-blog-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthToken, storeUtils } from '@cookingblog/shared/web/utils';
import { forwardTo } from '@cookingblog/blog/utils';

export const login = createAsyncThunk<LoginRes['data'], LoginReq>(
  'auth/login',
  storeUtils.withErrorHandler(async (data) => {
    const res = await authServices.login(data);

    setAuthToken(res.data.token);
    forwardTo('/');
    return res.data;
  })
);

export const register = createAsyncThunk<RegisterRes['data'], RegisterReq>(
  'auth/register',
  storeUtils.withErrorHandler(async (data) => {
    const res = await authServices.register(data);

    forwardTo('/login');
    return res.data;
  })
);
