import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCartTotal, clearCart } from '../../features/Cart/cartSlice.js';
import { USDFormat } from '../../utils/currencyFormat';
import CartItem from '../Cart/CartItem';

function CheckoutForm() {
  const { items, totalAmount } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsBuy = items.map((item: any) => {
    return {
      product: item,
      quantity: item.amount,
    };
  });
  console.log(productsBuy);
  useEffect(() => {
    if (user && user.user.role === 'admin') {
      toast.info('Admin cannot checkout', {
        position: 'bottom-right',
      });
      navigate('/cart');
    }
  }, []);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [items, dispatch]);
  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="-translate-y-1/2 text-center">
          <h1 className="text-3xl font-bold">
            <RemoveShoppingCartIcon fontSize="large" /> Your cart is empty
          </h1>
          <Link
            to="/products"
            className="text-lg font-semibold hover:text-blueDark"
          >
            Go to products
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="my-10 mx-20 flex min-h-screen shadow-md">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="flex items-center justify-between border-b pb-8">
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <h2 className="flex flex-col text-lg font-semibold">
            Input your info below
          </h2>
        </div>
        <div className="mt-10 mb-5 flex w-full">
          <div className="w-full">
            <form>
              <div className="grid md:grid-cols-2 md:gap-x-2">
                <div className="form-control">
                  <label htmlFor="name" className="pb-1 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-info border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="email" className="pb-1 text-sm text-gray-600">
                    Email address
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-info border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0"
                  />
                </div>
              </div>
              <div className="form-control py-2">
                <label
                  htmlFor="textarea"
                  className="pb-1 text-sm text-gray-600"
                >
                  Address
                </label>
                <textarea
                  cols={5}
                  rows={10}
                  className="textarea textarea-info resize-none border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0 md:h-24"
                />
              </div>
              <div className="grid md:grid-cols-2 md:gap-x-2">
                <div className="form-control">
                  <label htmlFor="City" className="pb-1 text-sm text-gray-600">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="input input-info border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="email" className="pb-1 text-sm text-gray-600">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className="input input-info border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* {items?.map((item, idx) => (
          <CartItem key={idx + 1} item={item} />
        ))} */}

        <Link
          to="/products"
          className="mt-10 flex text-sm font-semibold text-indigo-600"
        >
          <svg
            className="mr-2 w-4 fill-current text-indigo-600"
            viewBox="0 0 448 512"
          >
            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
          </svg>
          Continue Shopping
        </Link>
      </div>
      <div id="summary" className="w-1/2  py-10 ">
        <h1 className="border-b pb-8 text-2xl font-semibold">Order Summary</h1>
        <div className="mt-10 mb-5 flex max-h-80 min-w-fit max-w-xl flex-col justify-between overflow-y-auto overflow-x-hidden">
          {items?.map((item, idx) => (
            <CartItem key={idx + 1} item={item} />
          ))}
        </div>

        <div className="mt-8 p-2 ">
          <div className="text-md flex  gap-x-2 py-2 font-bold uppercase">
            <span>Items</span>
            <span>{items.length}</span>
          </div>
          <div className="flex justify-between py-2 text-sm font-semibold uppercase">
            <span>Subtotal</span>
            <span>{USDFormat(totalAmount)}</span>
          </div>
          <div className="flex justify-between py-2 text-sm font-semibold uppercase">
            <span>Shipping</span>
            <span>{USDFormat(0)}</span>
          </div>
          <div className="flex justify-between py-2 text-sm font-semibold uppercase">
            <span>Total cost</span>
            <span className="font-bold">{USDFormat(totalAmount)}</span>
          </div>
          <button
            type="button"
            className="btn w-full rounded-sm border-0 bg-indigo-500 py-3 text-sm font-semibold uppercase text-white hover:bg-indigo-600"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
