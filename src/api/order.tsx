import instance from './instance';
import { isAuthenticated } from '../utils/localstorage';
import authHeader from '../utils/auth-header';

export const getAllOrders = () => {
  const URL = `/api/orders/${isAuthenticated().user._id}`;
  return instance.get(URL, authHeader());
};

export const add = (order: any) => {
  const URL = `/api/orders/${isAuthenticated().user._id}`;
  return instance.post(URL, order, authHeader());
};
