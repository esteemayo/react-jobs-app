import http from './httpService';

const tokenKey = 'jwt';
const apiEndpoint = '/users';

export const registerUser = (userData) =>
  http.post(`${apiEndpoint}/register`, userData);

export const loginUser = (userData) =>
  http.post(`${apiEndpoint}/login`, userData);

export const getJwt = () => localStorage.getItem(tokenKey);
