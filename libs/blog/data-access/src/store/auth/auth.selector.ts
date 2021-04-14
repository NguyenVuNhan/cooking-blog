import { AUTH_FEATURE_KEY, AuthState } from './auth.slice';

export const selectAuthenticatedStatus = (rootState: unknown): boolean =>
  (rootState[AUTH_FEATURE_KEY] as AuthState).authenticated;
