import { AUTH_FEATURE_KEY, AuthState } from './auth.slice';

export const getAuthenticatedStatus = (rootState: unknown): boolean =>
  (rootState[AUTH_FEATURE_KEY] as AuthState).authenticated;
