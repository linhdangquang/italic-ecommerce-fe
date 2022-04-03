import instance from './instance';
import { isAuthenticated } from '../utils/localstorage';
import { CategoryType } from '../types';

if (isAuthenticated()) {
  const { token } = isAuthenticated();
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
} else {
  instance.defaults.headers.common.Authorization = '';
}

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
  return instance.post(URL, category);
};

export const edit = (category: CategoryType) => {
  const URL = `/api/categories/${isAuthenticated().user._id}/${category._id}`;
  return instance.put(URL, category);
};

export const delCategory = (id: string) => {
  const URL = `/api/categories/${isAuthenticated().user._id}/${id}`;
  return instance.delete(URL);
};
