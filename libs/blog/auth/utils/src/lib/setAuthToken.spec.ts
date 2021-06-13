import { setAuthToken } from './setAuthToken';
import axios from 'axios';

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
