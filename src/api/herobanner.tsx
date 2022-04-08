import instance from './instance';
import { isAuthenticated } from '../utils/localstorage';
import authHeader from '../utils/auth-header';
import { BannerType } from '../types';

export const getAllBanner = () => {
  const URL = '/api/herobanner';
  return instance.get(URL);
};

export const add = (banner: BannerType) => {
  const URL = `/api/herobanner/${isAuthenticated().user._id}`;
  return instance.post(URL, banner, authHeader());
};

export const remove = (id: string) => {
  const URL = `/api/herobanner/${isAuthenticated().user._id}/${id}`;
  return instance.delete(URL, authHeader());
};

export const update = (banner: BannerType) => {
  const URL = `/api/herobanner/${isAuthenticated().user._id}/${banner._id}`;
  return instance.put(URL, banner, authHeader());
};

export const getOne = (id: string) => {
  const URL = `/api/herobanner/${id}`;
  return instance.get(URL, authHeader());
};
