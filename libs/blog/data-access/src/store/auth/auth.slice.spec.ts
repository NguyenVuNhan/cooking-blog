import { authReducer, authActions } from './auth.slice';
import { setAuthToken, clearAuthToken } from '@cookingblog/shared/web/utils';
import { authServices } from '@cookingblog/shared/data-access/cooking-blog-api';
import { forwardTo } from '@cookingblog/blog/utils';
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from '@cookingblog/api-interfaces';

jest.mock('@cookingblog/shared/data-access/cooking-blog-api');
jest.mock('@cookingblog/blog/utils');
jest.mock('@cookingblog/shared/web/utils', () => ({
  ...jest.requireActual('@cookingblog/shared/web/utils'),
  setAuthToken: jest.fn(),
  clearAuthToken: jest.fn(),
}));

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
    jest.unmock('@cookingblog/shared/data-access/cooking-blog-api');
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
          { ...expected, errors: [{ msg: 'error', param: 'error' }] },
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

  // ----------------------------------------------------------------------
  // Other actions
  // ----------------------------------------------------------------------
  describe('register', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let action: AsyncThunkAction<RegisterRes['data'], RegisterReq, {}>;

    let dispatch: Dispatch; // Create the "spy" properties
    let getState: () => unknown;

    let arg: RegisterReq;
    let result: RegisterRes;

    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn();
      getState = jest.fn();

      authServicesMock.register.mockClear();
      authServicesMock.register.mockResolvedValue(result);

      arg = {
        name: 'name',
        email: 'me@myemail.com',
        password: 'password',
        cpassword: 'password',
      };
      result = {
        data: { email: 'me@myemail.com' },
        message: 'message',
        success: true,
      };

      action = authActions.register(arg);
    });

    it('should call the api correctly', async () => {
      await action(dispatch, getState, undefined);
      expect(authServices.register).toHaveBeenCalledWith(arg);
    });

    it('should forward to login page', async () => {
      await action(dispatch, getState, undefined);
      expect(forwardToMock).toHaveBeenCalledWith('/login');
    });

    it('should update store', async () => {
      const expected = {
        loading: false,
        authenticated: false,
      };
      expect(
        authReducer(undefined, {
          type: authActions.register.fulfilled.toString(),
          payload: { user: {} },
        })
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
        data: { user: { id: 'id', email: 'me@myemail.com' }, token: 'Token' },
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
