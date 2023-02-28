export const tokenKey = 'jwt';

export const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}