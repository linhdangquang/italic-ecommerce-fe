import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { OrderEditValidationSchema } from '../../schema/orderEdit';
import { getOrderByID, updateOrder } from '../../features/Order/ordersSlice.js';

type FormInputs = {
  address: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  name: string;
};

function EditOrderForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const order = useSelector((state) => getOrderByID(state, orderId));
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(OrderEditValidationSchema) });
  const { loading } = useSelector((state: any) => state.orders);
  const onSubmit: SubmitHandler<FormInputs> = async (orderFormData: any) => {
    try {
      await dispatch(updateOrder(orderFormData));
      navigate('/admin/orders');
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (order) {
      reset(order);
    }
  }, [orderId]);
  useEffect(() => {
    document.title = 'Edit Order';
  }, []);
  return (
    <div className="flex">
      <div className="card ml-4 mt-4 w-full max-w-4xl flex-shrink-0 bg-base-100 shadow-lg shadow-slate-400 drop-shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Name</span>
                </label>
                <input
                  className=" input input-info border-2 "
                  type="text"
                  placeholder="Name"
                  {...register('name')}
                />
                {errors.name?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors.name?.message}
                  </Alert>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  className=" input input-info border-2 "
                  type="text"
                  placeholder="Email"
                  {...register('email')}
                />
                {errors.email?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors.email?.message}
                  </Alert>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 items-start justify-start gap-x-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Address</span>
                </label>
                <textarea
                  cols={5}
                  rows={10}
                  className="textarea textarea-info resize-none border-2 shadow shadow-cyan-300 drop-shadow-sm focus:shadow-md focus:shadow-cyan-300 focus:outline-0 md:h-24"
                  {...register('address')}
                />
                {errors?.address && (
                  <Alert
                    severity="error"
                    variant="filled"
                    className="my-1 mb-2"
                  >
                    {errors?.address.message}
                  </Alert>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">City</span>
                </label>
                <input
                  className=" input input-info border-2 "
                  type="text"
                  placeholder="City"
                  {...register('city')}
                />
                {errors.city?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors.city?.message}
                  </Alert>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="form-control my-2">
                <label className="label">
                  <span className="label-text font-semibold">Status</span>
                </label>
                <div className="flex gap-x-3">
                  <div className=" flex items-center">
                    <input
                      type="radio"
                      {...register('status')}
                      className="radio border-orangeLight  checked:bg-orangeLight "
                      value="pending"
                    />
                    <label className="label">
                      <span className="label-text font-semibold text-orangeLight">
                        Pending
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      {...register('status')}
                      className="radio border-blue-500  checked:bg-blue-500"
                      value="delivery"
                    />
                    <label className="label">
                      <span className="label-text font-semibold text-blue-500">
                        Delivery
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      {...register('status')}
                      className="radio border-green-500  checked:bg-green-500"
                      value="completed"
                    />
                    <label className="label">
                      <span className="label-text font-semibold text-green-500">
                        Completed
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      {...register('status')}
                      className="radio border-roseLight  checked:bg-roseLight"
                      value="cancelled"
                    />
                    <label className="label">
                      <span className="label-text font-semibold text-roseLight">
                        Cancelled
                      </span>
                    </label>
                  </div>
                </div>
                {errors.status?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors.status?.message}
                  </Alert>
                )}
              </div>
            </div>
            {!loading && (
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn  border-2 border-cyan-400  bg-sky-400 py-2 px-4 text-base font-bold text-white shadow shadow-sky-400 hover:bg-sky-500 "
                >
                  Create
                </button>
              </div>
            )}
            {loading && (
              <div className="flex min-h-fit items-center justify-center">
                <BeatLoader size={20} color="#34d399" margin={2} />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOrderForm;
