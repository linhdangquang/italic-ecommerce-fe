import instance from './instance';

export const getAllProducts = () => {
  const URL = '/api/products';
  return instance.get(URL);
};

export const delProduct = (id: string) => {
  const URL = `/api/products/${id}`;
  return instance.delete(URL);
};
