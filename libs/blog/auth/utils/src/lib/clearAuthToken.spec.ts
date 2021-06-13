import { clearAuthToken } from './clearAuthToken';
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
