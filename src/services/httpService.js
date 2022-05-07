import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';
import { getJwt } from './userService';

const authFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

authFetch.interceptors.request.use(
  (request) => {
    request.headers.common['Authorization'] = `Bearer ${getJwt()}`;
    return request;
  },
  (error) => {
    logger.log(error);
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred');
  }

  return Promise.reject(error);
});

const http = {
  get: authFetch.get,
  post: authFetch.post,
  patch: authFetch.patch,
  delete: authFetch.delete,
};

export default http;
