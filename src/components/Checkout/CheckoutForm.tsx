/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import { toast } from 'react-toastify';
import usePlacesAutocomplete from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { MoonLoader } from 'react-spinners';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { USDFormat } from '../../utils/currencyFormat';
import { checkoutFormValidationSchema } from '../../schema/checkout';
import CartItem from '../Cart/CartItem';
import { addOrder } from '../../features/Order/ordersSlice.js';
import { clearCart } from '../../features/Cart/cartSlice.js';

type FormInputs = {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
};

function CheckOutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(checkoutFormValidationSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.orders);
  const { items, totalAmount } = useSelector((state: any) => state.cart);
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();
    };
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className="cursor-pointer px-4 hover:bg-slate-100"
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    data.address = value;
    const productsBuy = items.map((item: any) => {
      return {
        productId: item._id,
        quantity: item.amount,
      };
    });
    const confirmSwal = withReactContent(Swal);
    confirmSwal
      .fire({
        title: 'Are you sure?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#38bdf8',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes, checkout!',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await dispatch(
              addOrder({
                user: user.user._id,
                name: data.name,
                email: data.email,
                address: data.address,
                city: data.city,
                phone: data.phone,
                products: productsBuy,
                total: totalAmount,
              })
            );
            await dispatch(clearCart());
            navigate('/cart');
          } catch (error) {
            toast('❤ Something went wrong', {
              position: 'bottom-right',
            });
          }
        }
      });
  };
  useEffect(() => {
    if (isLoggedIn) {
      reset({
        name: user?.user.name,
        email: user?.user.email,
      });
    }
  }, [reset, user]);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 md:gap-x-2">
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-info border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0"
                    {...register('name')}
                  />
                  {errors?.name && (
                    <Alert
                      severity="error"
                      variant="filled"
                      className="my-1 mb-2"
                    >
                      {errors?.name.message}
                    </Alert>
                  )}
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-info border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0"
                    {...register('email')}
                  />
                  {errors?.email && (
                    <Alert
                      severity="error"
                      variant="filled"
                      className="my-1 mb-2"
                    >
                      {errors?.email.message}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="form-control my-2">
                <input
                  value={value}
                  disabled={!ready}
                  placeholder="Your address"
                  className="textarea textarea-info w-full resize-none border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0"
                  {...register('address')} // <-- register the input
                  onChange={handleInput}
                />
                {status === 'OK' && (
                  <ul className="mb-2 rounded-b bg-slate-200">
                    {renderSuggestions()}
                  </ul>
                )}
                {/* <textarea
                  cols={5}
                  rows={10}
                  className="textarea textarea-info resize-none border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0 md:h-24"
                  {...register('address')}
                /> */}
                {errors?.address && (
                  <Alert
                    severity="error"
                    variant="filled"
                    className="my-1 mb-2"
                  >
                    {errors.address.message}
                  </Alert>
                )}
              </div>
              <div className="grid md:grid-cols-2 md:gap-x-2">
                <div className="form-control">
                  <input
                    type="string"
                    placeholder="Phone Number"
                    className="input input-info border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0"
                    {...register('phone')}
                  />
                  {errors?.phone && (
                    <Alert
                      severity="error"
                      variant="filled"
                      className="my-1 mb-2"
                    >
                      {errors?.phone.message}
                    </Alert>
                  )}
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="City"
                    className="input input-info border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0"
                    {...register('city')}
                  />
                  {errors?.city && (
                    <Alert
                      severity="error"
                      variant="filled"
                      className="my-1 mb-2"
                    >
                      {errors?.city.message}
                    </Alert>
                  )}
                </div>
              </div>

              <div className="form-control relative my-4 flex items-center justify-center">
                <button
                  type="submit"
                  className=" btn  w-full rounded-sm border-0 bg-indigo-500 py-3 text-sm font-semibold uppercase text-white hover:bg-indigo-600"
                >
                  Confirm Order
                </button>
                {loading && (
                  <MoonLoader
                    size={25}
                    color="#171722"
                    // css={{
                    //   zIndex: 1,
                    //   left: '35%',
                    //   position: 'absolute',
                    // }}
                  />
                )}
              </div>
            </form>
          </div>
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
            <span>{items?.length}</span>
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
        </div>
      </div>
    </div>
  );
}

export default CheckOutForm;
