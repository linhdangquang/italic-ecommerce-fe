import { UserType } from '../types';
import authHeader from '../utils/auth-header';
import instance from './instance';

export const signInUser = async (data: UserType) => {
  const URL = '/api/users/signin';
  const res = await instance.post(URL, data, authHeader());
  if (res.data.token) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

export const signUpUser = (data: UserType) => {
  const URL = '/api/users/signup';
  return instance.post(URL, data);
};

export const logOutUser = () => {
  localStorage.removeItem('user');
};
