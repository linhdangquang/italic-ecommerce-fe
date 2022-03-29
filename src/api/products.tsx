import { ProductType } from '../types';
import { isAuthenticated } from '../utils/localstorage';
import instance from './instance';

const { token } = isAuthenticated();

export const getAllProducts = () => {
  const URL = '/api/products';
  return instance.get(URL);
};

export const delProduct = (id: string) => {
  const URL = `/api/products/${id}`;
  return instance.delete(URL);
};

export const getOneProduct = (id: string) => {
  const URL = `/api/products/${id}`;
  return instance.get(URL);
};

export const updateProduct = (data: ProductType) => {
  const URL = `/api/products/${data._id}`;
  return instance.put(URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
