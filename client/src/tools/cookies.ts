import cookie from 'react-cookies';

const setCookie = (
  key,
  value,
  hoursToExpire = 24,
  path = undefined,
  maxAge = undefined,
  domain = undefined,
  secure = undefined,
  httpOnly = undefined
) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + hoursToExpire * 60 * 60 * 1000);
  cookie.save(key, value, { path, expires, maxAge, domain, secure, httpOnly });
};

const getCookie = (key) => {
  return cookie.load(key);
};

const removeCookie = (key) => {
  cookie.remove(key);
};

const loginKey = 'login';

export const setLogin = (value) => {
  setCookie(loginKey, value, 2);
};

export const getLogin = () => {
  return getCookie(loginKey);
};

export const removeLogin = () => {
  removeCookie(loginKey);
};
