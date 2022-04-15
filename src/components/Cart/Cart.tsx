import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { toast } from 'react-toastify';
import { getCartTotal, clearCart } from '../../features/Cart/cartSlice.js';
import { USDFormat } from '../../utils/currencyFormat';
import CartItem from './CartItem';

function Cart() {
  const { items, totalAmount } = useSelector((state: any) => state.cart);
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <div className="flex  justify-between border-b pb-8">
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          <h2 className="flex flex-col text-2xl font-semibold">
            {items?.length} Items
            <button
              type="button"
              className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
              onClick={() => {
                dispatch(clearCart());
                toast.info('Cart cleared successfully', {
                  position: 'bottom-right',
                });
              }}
            >
              Clear cart
            </button>{' '}
          </h2>
        </div>
        <div className="mt-10 mb-5 flex ">
          <h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">
            Product Details
          </h3>
          <h3 className="w-1/5  text-center text-xs font-semibold uppercase text-gray-600">
            Quantity
          </h3>
          <h3 className="w-1/5  text-center text-xs font-semibold uppercase text-gray-600">
            Price
          </h3>
          <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
            Total
          </h3>
        </div>
        <div className="cartItem overflow-auto overflow-x-hidden md:max-h-[500px]">
          {items?.map((item, idx) => (
            <CartItem key={idx + 1} item={item} />
          ))}
        </div>

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
      <div id="summary" className="w-1/4 px-8 py-10">
        <h1 className="border-b pb-8 text-2xl font-semibold">Order Summary</h1>
        <div className="mt-10 mb-5 flex justify-between">
          <span className="text-sm font-semibold uppercase">
            Items: {items?.length}
          </span>
          <span className="text-sm font-semibold">
            {USDFormat(totalAmount)}
          </span>
        </div>
        <div>
          <label className="mb-3 inline-block text-sm font-medium uppercase">
            Shipping
          </label>
          <select className="block w-full p-2 text-sm text-gray-600">
            <option>Free shipping</option>
          </select>
        </div>

        <div className="mt-8 border-t">
          <div className="flex justify-between py-6 text-sm font-semibold uppercase">
            <span>Total cost</span>
            <span>{USDFormat(totalAmount)}</span>
          </div>

          <button
            type="button"
            className="btn relative w-full rounded-sm border-0 bg-indigo-500 py-3 text-sm font-semibold uppercase text-white hover:bg-indigo-600"
            onClick={() => {
              if (!isLoggedIn) {
                toast.warning('Please sign in before checkout', {
                  position: 'bottom-right',
                });
                navigate('/signin');
              }
              if (user?.user.role === 'admin') {
                toast.warning('Admin cannot checkout', {
                  position: 'bottom-right',
                });
                navigate('/cart');
              }
            }}
          >
            <Link
              to="checkout"
              className="absolute inset-0 flex items-center justify-center"
            >
              Checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
