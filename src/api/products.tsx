import { ProductType } from '../types';
import instance from './instance';

import authHeader from '../utils/auth-header';

export const getAllProducts = () => {
  const URL = '/api/products';
  return instance.get(URL);
};

export const add = (product: ProductType) => {
  const URL = '/api/products';
  return instance.post(URL, product, authHeader());
};

export const delProduct = (id: string) => {
  const URL = `/api/products/${id}`;
  return instance.delete(URL, authHeader());
};

export const getOneProduct = (id: string) => {
  const URL = `/api/products/${id}`;
  return instance.get(URL);
};

export const updateProduct = (data: ProductType) => {
  const URL = `/api/products/${data._id}`;
  return instance.put(URL, data, authHeader());
};
