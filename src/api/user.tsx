import { UserType } from '../types';
import { isAuthenticated } from '../utils/localstorage';
import instance from './instance';

if (isAuthenticated()) {
  const { token } = isAuthenticated();
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
} else {
  instance.defaults.headers.common.Authorization = '';
}

export const signInUser = (data: UserType) => {
  const URL = '/api/users/signin';
  return instance.post(URL, data).then((res) => {
    if (res.data.token) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
  });
};

export const signUpUser = (data: UserType) => {
  const URL = '/api/users/signup';
  return instance.post(URL, data);
};

export const logOutUser = () => {
  const URL = '/api/users/me/logout';
  localStorage.removeItem('user');
  return instance.post(URL);
};
