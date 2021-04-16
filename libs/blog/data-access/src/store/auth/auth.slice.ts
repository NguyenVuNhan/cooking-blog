import { ErrorRes, LoginRes } from '@cookingblog/api-interfaces';
import {
  clearAuthToken,
  setAuthToken,
  storeUtils,
} from '@cookingblog/shared/web/utils';
import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { login, register } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  authenticated: boolean;
  user?: LoginRes['data']['user'];
  loading: boolean;
  errors?: ErrorRes['data']['errors'];
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
        state.authenticated = true;
      })
      .addMatcher(storeUtils.isFulfilledAction(AUTH_FEATURE_KEY), (state) => {
        state.loading = false;
      })
      .addMatcher(storeUtils.isPendingAction(AUTH_FEATURE_KEY), (state) => {
        state.loading = true;
      })
      .addMatcher(
        storeUtils.isRejectedAction(AUTH_FEATURE_KEY),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const authReducer = authSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const authActions = { ...authSlice.actions, login, register };
