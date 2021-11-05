import { ErrorRes, LoginReq, LoginRes } from '@cookingblog/api/interfaces';
import { clearAuthToken, setAuthToken } from '@cookingblog/blog/auth/utils';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  withErrorHandler,
} from '@cookingblog/shared/web/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import * as authServices from './auth.service';

export const AUTH_FEATURE_KEY = 'auth';

// ======================================================================
// Actions
// ======================================================================
const login = createAsyncThunk<LoginRes['data'], LoginReq>(
  'auth/login',
  withErrorHandler(async (data) => {
    const res = await authServices.login(data);

    setAuthToken(res.data.token);
    return res.data;
  })
);

// ======================================================================
// Slice
// ======================================================================
export interface AuthState {
  authenticated: boolean;
  user?: LoginRes['data']['user'];
  token?: string;
  loading: boolean;
  errors?: ErrorRes;
}

const initialState: AuthState = {
  loading: false,
  authenticated: false,
};

// Check for token
if (localStorage.jwtToken) {
  const decoded = jwt_decode<LoginRes['data']['user'] & { exp: number }>(
    localStorage.jwtToken
  );
  const currentTime = Date.now() / 1000;

  if (currentTime > decoded.exp) {
    clearAuthToken();
  } else {
    setAuthToken(localStorage.jwtToken);
    initialState.user = decoded;
    initialState.token = localStorage.jwtToken;
    initialState.authenticated = true;
  }
}

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticated = false;
      state.user = undefined;
      clearAuthToken();
    },
    clearError: (state) => {
      state.errors = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.authenticated = true;
      })
      .addMatcher(isFulfilledAction(AUTH_FEATURE_KEY), (state) => {
        state.loading = false;
      })
      .addMatcher(isPendingAction(AUTH_FEATURE_KEY), (state) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction(AUTH_FEATURE_KEY), (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = { ...authSlice.actions, login };

// ======================================================================
// Selector
// ======================================================================
export const getAuthenticated = (rootState: unknown) =>
  (rootState[AUTH_FEATURE_KEY] as AuthState).authenticated;

export const getErrors = (rootState: unknown) =>
  (rootState[AUTH_FEATURE_KEY] as AuthState).errors;

export const getUserId = (rootState: unknown) =>
  (rootState[AUTH_FEATURE_KEY] as AuthState).user?.id;

export const getUser = (rootState: unknown) =>
  (rootState[AUTH_FEATURE_KEY] as AuthState).user;
