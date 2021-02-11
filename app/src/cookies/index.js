import cookie from 'react-cookies';

export const setCookie = (
  key,
  value,
  path,
  hoursToExpire = 24,
  maxAge,
  domain,
  secure,
  httpOnly
) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + hoursToExpire * 60 * 60 * 1000);
  cookie.save(key, value, { path, expires, maxAge, domain, secure, httpOnly });
};

export const getCookie = (key) => {
  cookie.load(key);
};

export const removeCookie = (key) => {
  cookie.remove(key);
};
