import { authReducer, authActions } from './auth.slice';
import * as authServices from './auth.service';
import { forwardTo } from '@cookingblog/blog/shared/utils';
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from '@cookingblog/api/interfaces';
import { clearAuthToken, setAuthToken } from '@cookingblog/blog/auth/utils';

jest.mock('./auth.service');
jest.mock('@cookingblog/blog/utils');
jest.mock('@cookingblog/blog/auth/utils');

type AuthServicesMockType = jest.Mocked<typeof authServices>;
type ForwardToMockType = jest.Mocked<typeof forwardTo>;
type SetAuthTokenMock = jest.Mocked<typeof setAuthToken>;
type ClearAuthTokenMock = jest.Mocked<typeof clearAuthToken>;

describe('Auth reducer', () => {
  let authServicesMock: AuthServicesMockType;
  let forwardToMock: ForwardToMockType;
  let setAuthTokenMock: SetAuthTokenMock;
  let clearAuthTokenMock: ClearAuthTokenMock;

  beforeAll(() => {
    authServicesMock = authServices as AuthServicesMockType;
    forwardToMock = forwardTo as ForwardToMockType;
    setAuthTokenMock = setAuthToken as SetAuthTokenMock;
    clearAuthTokenMock = clearAuthToken as ClearAuthTokenMock;
  });

  afterAll(() => {
    jest.unmock('./auth.service');
    jest.unmock('@cookingblog/blog/utils');
    jest.unmock('@cookingblog/shared/web/utils');
  });

  it('should handle initial state', () => {
    const expected = {
      loading: false,
      authenticated: false,
    };

    expect(authReducer(undefined, { type: '' })).toEqual(expected);
  });

  // ----------------------------------------------------------------------
  // Slice reducer actions
  // ----------------------------------------------------------------------
  describe('clearError', () => {
    it('should clear all auth error', () => {
      const expected = {
        loading: false,
        authenticated: false,
      };
      expect(
        authReducer(
          {
            ...expected,
            errors: {
              data: { error: { error: 'error' } },
              message: 'error',
              success: false,
            },
          },
          { type: 'auth/clearError' }
        )
      ).toEqual(expected);
    });
  });

  describe('logout', () => {
    it('should clear jwt token', () => {
      authReducer(undefined, { type: 'auth/logout' });
      expect(clearAuthTokenMock).toBeCalled();
    });

    it('should logout user', () => {
      const expected = {
        loading: false,
        authenticated: false,
      };
      expect(
        authReducer(
          { loading: false, authenticated: true },
          { type: 'auth/logout' }
        )
      ).toEqual(expected);
    });
  });

  describe('login', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let action: AsyncThunkAction<LoginRes['data'], LoginReq, {}>;

    let dispatch: Dispatch; // Create the "spy" properties
    let getState: () => unknown;

    let arg: LoginReq;
    let result: LoginRes;

    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn();
      getState = jest.fn();

      authServicesMock.login.mockClear();
      authServicesMock.login.mockResolvedValue(result);

      arg = { email: 'me@myemail.com', password: 'yeetmageet123' };
      result = {
        data: {
          user: { id: 'id', email: 'me@myemail.com', name: 'me' },
          token: 'Token',
          exp: 3600,
        },
        message: 'message',
        success: true,
      };

      action = authActions.login(arg);
    });

    it('should call the api correctly', async () => {
      await action(dispatch, getState, undefined);
      expect(authServices.login).toHaveBeenCalledWith(arg);
    });

    it('should save token to local storage', async () => {
      await action(dispatch, getState, undefined);
      expect(setAuthTokenMock).toBeCalledWith('Token');
    });

    it('should forward to home', async () => {
      await action(dispatch, getState, undefined);
      expect(forwardToMock).toHaveBeenCalledWith('/');
    });

    it('should update store', async () => {
      const expected = {
        loading: false,
        authenticated: true,
        user: {},
      };
      expect(
        authReducer(undefined, {
          type: authActions.login.fulfilled.toString(),
          payload: { user: {} },
        })
      ).toEqual(expected);
    });
  });
});
