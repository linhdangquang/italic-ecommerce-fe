import { ProductType } from '../types';
import instance from './instance';
import { isAuthenticated } from '../utils/localstorage';

if (isAuthenticated()) {
  const { token } = isAuthenticated();
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
} else {
  instance.defaults.headers.common.Authorization = '';
}
const userId = isAuthenticated().user._id;

export const getAllProducts = () => {
  const URL = '/api/products';
  return instance.get(URL);
};

export const add = (product: ProductType) => {
  const URL = `/api/products/${userId}`;
  return instance.post(URL, product);
};

export const delProduct = (id: string) => {
  const URL = `/api/products/${userId}/${id}`;
  return instance.delete(URL);
};

export const getOneProduct = (id: string) => {
  const URL = `/api/products/${id}`;
  return instance.get(URL);
};

export const putProduct = (data: ProductType) => {
  const URL = `/api/products/${userId}/${data._id}`;
  return instance.put(URL, data);
};
