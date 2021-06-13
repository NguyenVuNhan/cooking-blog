import axios from 'axios';

export const clearAuthToken = (): void => {
  localStorage.removeItem('jwtToken');
  delete axios.defaults.headers.common['Authorization'];
};
