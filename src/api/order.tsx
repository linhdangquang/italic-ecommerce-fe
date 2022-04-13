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

export const update = (order: any) => {
  const URL = `/api/orders/${isAuthenticated().user._id}/${order._id}`;
  return instance.put(URL, order, authHeader());
};

export const getOrderDetails = (orderId: string) => {
  const URL = `/api/orders/details/${isAuthenticated().user._id}/${orderId}`;
  return instance.get(URL, authHeader());
};

export const del = (orderId: string) => {
  const URL = `/api/orders/${isAuthenticated().user._id}/${orderId}`;
  return instance.delete(URL, authHeader());
};

export const getOrderByUserId = (userId: string) => {
  if (!userId) {
    return;
  }
  const URL = `/api/orders/user/${userId}`;
  return instance.get(URL, authHeader());
};
