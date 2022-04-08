import instance from './instance';
import { isAuthenticated } from '../utils/localstorage';
import authHeader from '../utils/auth-header';
import { CategoryType } from '../types';

export const getAllCategories = () => {
  const URL = '/api/categories';
  return instance.get(URL);
};

export const getDetail = (id: string) => {
  const URL = `/api/categories/${id}`;
  return instance.get(URL);
};

export const add = (category: CategoryType) => {
  const URL = `/api/categories/${isAuthenticated().user._id}`;
  return instance.post(URL, category, authHeader());
};

export const edit = (category: CategoryType) => {
  const URL = `/api/categories/${isAuthenticated().user._id}/${category._id}`;
  return instance.put(URL, category, authHeader());
};

export const delCategory = (id: string) => {
  const URL = `/api/categories/${isAuthenticated().user._id}/${id}`;
  return instance.delete(URL, authHeader());
};
