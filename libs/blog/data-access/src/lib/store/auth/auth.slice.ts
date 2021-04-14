import { ErrorRes, LoginRes } from '@cookingblog/api-interfaces';
import { storeUtils } from '@cookingblog/shared/web/utils';
import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  authenticated: boolean;
  user?: LoginRes['data']['user'];
  loading: boolean;
  errors?: ErrorRes['data'];
}

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: {
    loading: false,
    authenticated: false,
  } as AuthState,
  reducers: {
    clearError: (state) => {
      state.errors = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
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
