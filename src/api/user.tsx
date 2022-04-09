import { UserType } from '../types';
import authHeader from '../utils/auth-header';
import instance from './instance';
import { isAuthenticated } from '../utils/localstorage';

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

export const getAllUser = async () => {
  const URL = `/api/users/${isAuthenticated().user._id}`;
  const res = await instance.get(URL, authHeader());
  return res.data;
};

export const updateUser = async (data: UserType) => {
  const URL = `/api/users/${isAuthenticated().user._id}`;
  const res = await instance.put(URL, data, authHeader());
  return res.data;
};
