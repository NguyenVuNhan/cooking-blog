import { AUTH_FEATURE_KEY, AuthState } from './auth.slice';

export const authenticated = (rootState: unknown) =>
  (rootState[AUTH_FEATURE_KEY] as AuthState).authenticated;

export const errors = (rootState: unknown) =>
  (rootState[AUTH_FEATURE_KEY] as AuthState).errors;
