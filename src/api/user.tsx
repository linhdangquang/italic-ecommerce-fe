import { UserType } from '../types';
import instance from './instance';

export const signInUser = (data: UserType) => {
  const URL = '/api/users/signin';
  return instance.post(URL, data);
};

export const signUpUser = (data: UserType) => {
  const URL = '/api/users/signup';
  return instance.post(URL, data);
};
