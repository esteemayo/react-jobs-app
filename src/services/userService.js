import http from './httpService';

const tokenKey = 'jwt';
const apiEndpoint = '/users';

http.setJwt(getJwt());

export function registerUser(userData) {
    return http.post(`${apiEndpoint}/register`, userData);
};

export function loginUser(userData) {
    return http.post(`${apiEndpoint}/login`, userData);
};

function getJwt() {
    return localStorage.getItem(tokenKey);
};
