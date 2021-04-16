import axios from 'axios';

export const setAuthToken = (token: string): void => {
  localStorage.setItem('jwtToken', token);
  axios.defaults.headers.common['Authorization'] = token;
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('jwtToken');
  delete axios.defaults.headers.common['Authorization'];
};
