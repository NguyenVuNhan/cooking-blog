import axios from 'axios';

export const setAuthToken = (token: string): void => {
  localStorage.setItem('jwtToken', token);
  axios.defaults.headers.common['Authorization'] = token;
};
