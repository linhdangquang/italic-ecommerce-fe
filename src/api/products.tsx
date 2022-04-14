import { ProductType } from '../types';
import instance from './instance';
import { isAuthenticated } from '../utils/localstorage';
import authHeader from '../utils/auth-header';

export const getAllProducts = () => {
  const URL = '/api/products';
  return instance.get(URL);
};

export const add = (product: ProductType) => {
  const URL = `/api/products/${isAuthenticated().user._id}`;
  return instance.post(URL, product, authHeader());
};

export const delProduct = (id: string) => {
  const URL = `/api/products/${isAuthenticated().user._id}/${id}`;
  return instance.delete(URL, authHeader());
};

export const getOneProduct = (id: string) => {
  const URL = `/api/products/${id}`;
  return instance.get(URL, authHeader());
};

export const putProduct = (data: ProductType) => {
  const URL = `/api/products/${isAuthenticated().user._id}/${data._id}`;
  return instance.put(URL, data, authHeader());
};

export const searchProducts = (textSearch: string) => {
  if (!textSearch || textSearch === '') {
    return;
  }
  const URL = `/api/products/?q=${textSearch}`;
  return instance.get(URL);
};
