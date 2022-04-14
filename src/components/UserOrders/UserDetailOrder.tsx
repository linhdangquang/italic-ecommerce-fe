/* eslint-disable prettier/prettier */
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { getOrderDetails } from '../../api/order';
import {updateOrder} from '../../features/Order/ordersSlice.js';
import { USDFormat } from '../../utils/currencyFormat';

function UserDetailOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState<any>({});
  const [userInfo, setUserInfo] = useState<any>({});
  const [productsInfo, setProductsInfo] = useState<any>([]);
  const [productsQuantity, setProductsQuantity] = useState<any>(0);
  const { orderId } = useParams();
  useEffect(() => {
    getOrderDetails(orderId as string).then((res) => {
      setOrderInfo(res.data.orderDetails.orderInfo);
      setUserInfo(res.data.orderDetails.userInfo);
      setProductsInfo(res.data.orderDetails.products);
      setProductsQuantity(
        res.data.orderDetails.products
          .map((product) => product.quantity)
          .reduce((a, b) => a + b)
      );
    });
  }, [orderId]);
  const cancelOrder = async () => {
    const cancelSwal = withReactContent(Swal);
    cancelSwal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, i want to revert this!',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            dispatch(updateOrder({
              _id: orderInfo._id,
              status: 'cancelled',
            }));
            navigate('/orders');
            cancelSwal.fire('Cancelled', 'Order has been  cancelled', 'success');
          } catch (error) {
            cancelSwal.fire(
              'Error!',
              'Something went wrong, please try again.',
              'error'
            );
          }
        }
      });
  }
  const confirmReceived = async () => {
    const confirmSwal = withReactContent(Swal);
    confirmSwal
      .fire({
        title: 'Confirm received?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I has been received',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            dispatch(updateOrder({
              _id: orderInfo._id,
              status: 'completed',
            }));
            navigate('/orders');
            confirmSwal.fire('Confirmed', 'Order has been confirmed', 'success');
          } catch (error) {
            confirmSwal.fire(
              'Error!',
              'Something went wrong, please try again.',
              'error'
            );
          }
        }
      });
  }
  return (
    <div className="min-h-screen px-20 py-4">
      <h1 className="text-2xl font-bold text-gray-600">
        Order Details: #{orderInfo?._id}
      </h1>
      <div className="flex flex-wrap gap-2 gap-x-4 py-4">
        <div className="orderInfo w-1/3 rounded border-2 pb-0 border-gray-400 bg-slate-100 bg-gradient-to-br from-slate-500 to-cyan-600  p-0 text-neutral-content shadow-lg drop-shadow-md relative">
          <h3 className="mb-2 rounded-sm border-2 py-1 text-center font-semibold ">
            Order Information's
          </h3>
          <div className="flex flex-col relative px-2">
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">Order ID: </span>
              <span className="orderInfo__item-value">{orderInfo?._id}</span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">Order Date: </span>
              <span className="orderInfo__item-value">
                {dayjs(orderInfo?.createdAt).format('DD/MM/YYYY')}
              </span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">Order Status: </span>
              {orderInfo?.status === 'pending' && (
                <span className="orderInfo__item-value text-orange-500">
                  Pending
                </span>
              )}
              {orderInfo?.status === 'delivery' && (
                <span className="orderInfo__item-value text-blue-500">
                  Delivery
                </span>
              )}
              {orderInfo?.status === 'completed' && (
                <span className="orderInfo__item-value text-green-500">
                  Completed
                </span>
              )}
              {orderInfo?.status === 'cancelled' && (
                <span className="orderInfo__item-value text-rose-500">
                  Cancelled
                </span>
              )}
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">Total Price: </span>
              <span className="orderInfo__item-value">
                {USDFormat(orderInfo.total)}
              </span>
            </div>
          </div>
          {orderInfo?.status === 'pending' && (
            <div className="w-full mb-auto mt-2 ">
              <Button variant="outlined" color="error"  className="w-full bg-rose-600 text-white hover:bg-rose-700"
                onClick={cancelOrder}>
                Cancel Order
              </Button>
            </div>
          )}
          {orderInfo?.status === 'delivery' && (
            <div className="w-full mb-auto mt-2 ">
              <Button variant="outlined" color="info"  className="w-full bg-sky-600 text-white hover:bg-sky-700"
                onClick={confirmReceived}>
                Confirm Received
              </Button>
            </div>
          )}
        </div>
        <div className="orderInfo w-fit flex-1   rounded border-2 border-gray-400 bg-slate-100 bg-gradient-to-bl from-orangeLight  to-slate-600 text-neutral-content shadow-lg drop-shadow-md">
          <h3 className="mb-2 flex items-center justify-between rounded-sm border-2 py-1 text-center font-semibold px-2 ">
            User Information's{' '}
            <img
              src={userInfo?.avatarUrl}
              alt={userInfo?.avatarName}
              className="avatar cursor-pointer rounded-full transition-all md:h-6 md:w-6 md:hover:scale-[200%]"
            />
          </h3>
          <div className="flex flex-col px-2">
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">User ID: </span>
              <span className="orderInfo__item-value">{userInfo._id}</span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">User Name: </span>
              <span className="orderInfo__item-value">{orderInfo.name}</span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">User Email: </span>
              <span className="orderInfo__item-value">{orderInfo.email}</span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">Phone Number: </span>
              <span className="orderInfo__item-value">{orderInfo.phone}</span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">Address: </span>
              <span className="orderInfo__item-value">
                <address>{`${orderInfo.address}, ${orderInfo.city}`}</address>
              </span>
            </div>
          </div>
        </div>
        <div className="orderInfo w-full  flex-1 rounded border-2 border-gray-400 bg-slate-100 bg-gradient-to-tr from-pink-500 to-gray-600  text-neutral-content shadow-lg drop-shadow-md">
          <h3 className="mb-2 rounded-sm border-2 py-1 text-center font-semibold ">
            Products Ordered Information's
          </h3>
          <div className="flex flex-col px-2">
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">
                Total quantity: {productsQuantity}{' '}
              </span>
            </div>
            <span className="orderInfo__item-label text-white ">
              Products:{' '}
            </span>
            <div className="orderInfo__item overflow-x-auto">
              <table className="table table-zebra  w-full text-gray-800  ">
                <thead>
                  <tr>
                    <th />
                    <th className="font-semibold">Name</th>
                    <th className="font-semibold">Price</th>
                    <th className="font-semibold">Quantity</th>
                    <th className="font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {productsInfo.map((product, idx) => (
                    <tr key={idx} className="hover">
                      <th>{idx + 1}</th>
                      <td>{product.productItem.name}</td>
                      <td>{USDFormat(product.productItem.price)}</td>
                      <td>{product.quantity}</td>
                      <td>
                        {USDFormat(
                          product.quantity * product.productItem.price
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-right font-extrabold text-white">
              <span>Sum: {USDFormat(orderInfo.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailOrder;
