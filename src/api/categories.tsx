import instance from './instance';

export const getAllCategories = () => {
  const URL = '/api/categories';
  return instance.get(URL);
};
