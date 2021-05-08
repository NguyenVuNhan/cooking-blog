import { setAuthToken, clearAuthToken } from './token';
import axios from 'axios';

describe('clearAuthToken token utils', () => {
  it('should clear token from axios header', () => {
    clearAuthToken();
    expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
  });

  it('should clear token from local storage', () => {
    const removeItemSpy = jest.spyOn(
      window.localStorage.__proto__,
      'removeItem'
    );
    clearAuthToken();
    expect(removeItemSpy).toBeCalled();
    expect(window.localStorage.getItem('jwtToken')).toBeNull();
  });

  it('should be defined', () => {
    expect(clearAuthToken).toBeDefined();
  });
});

describe('setAuthToken token utils', () => {
  it('should add token to axios header', () => {
    setAuthToken('Token');
    expect(axios.defaults.headers.common['Authorization']).toBe('Token');
  });

  it('should add token to local storage', () => {
    const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
    setAuthToken('Token');
    expect(setItemSpy).toBeCalled();
    expect(window.localStorage.getItem('jwtToken')).toBe('Token');
  });

  it('should be defined', () => {
    expect(setAuthToken).toBeDefined();
  });
});
