/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getOrderDetails } from '../../api/order';
import { USDFormat } from '../../utils/currencyFormat';

function OrderDetails() {
 
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
  useEffect(() => {
    document.title = `Order Details #${orderInfo._id}`;
  }, [orderInfo._id])
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-600">Order Details</h1>
      <div className="flex flex-wrap gap-2 py-4">
        <div className="orderInfo  rounded border-2 border-gray-400 bg-slate-100 bg-gradient-to-br from-teal-500 to-gray-600 p-2 text-neutral-content shadow-lg drop-shadow-md">
          <h3 className="mb-2 rounded-sm border-2 py-1 text-center font-semibold ">
            Order Information's
          </h3>
          <div className="flex flex-col">
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
                {USDFormat(orderInfo?.total)}
              </span>
            </div>
          </div>
        </div>
        <div className="orderInfo grow  flex-1 rounded border-2 border-gray-400 bg-slate-100 bg-gradient-to-bl from-orangeLight to-slate-600 p-2 text-neutral-content shadow-lg drop-shadow-md">
          <h3 className="mb-2 flex items-center justify-between rounded-sm border-2 py-1 text-center font-semibold ">
            User Information's{' '}
            <img
              src={userInfo?.avatarUrl}
              alt={userInfo?.avatarName}
              className="avatar cursor-pointer rounded-full transition-all md:h-6 md:w-6 md:hover:scale-[200%]"
            />
          </h3>
          <div className="flex flex-col">
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">User ID: </span>
              <span className="orderInfo__item-value">{userInfo?._id}</span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">User Name: </span>
              <span className="orderInfo__item-value">{orderInfo?.name}</span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">User Email: </span>
              <span className="orderInfo__item-value">{orderInfo?.email}</span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">Phone Number: </span>
              <span className="orderInfo__item-value">{orderInfo?.phone}</span>
            </div>
            <div className="orderInfo__item">
              <span className="orderInfo__item-label">Address: </span>
              <span className="orderInfo__item-value">
                <address>{`${orderInfo?.address}, ${orderInfo?.city}`}</address>
              </span>
            </div>
          </div>
        </div>
        <div className="orderInfo w-full? rounded border-2 border-gray-400 bg-slate-100 bg-gradient-to-tr from-pink-500 to-gray-600 p-2 text-neutral-content shadow-lg drop-shadow-md">
          <h3 className="mb-2 rounded-sm border-2 py-1 text-center font-semibold ">
            Products Ordered Information's
          </h3>
          <div className="flex flex-col">
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
                  {productsInfo?.map((product, idx) => (
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
              <span>Sum: {USDFormat(orderInfo?.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
