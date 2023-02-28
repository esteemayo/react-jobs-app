import http from './httpService';
import { getFromStorage, tokenKey } from 'utils';

const apiEndpoint = '/users';

export const register = (userData) =>
  http.post(`${apiEndpoint}/register`, userData);

export const login = (userData) =>
  http.post(`${apiEndpoint}/login`, userData);

export const getJwt = () => localStorage.getItem(tokenKey);
