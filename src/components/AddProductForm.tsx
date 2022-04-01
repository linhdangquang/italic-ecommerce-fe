import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import { toast } from 'react-toastify';
import { ProductType } from '../types';
import { addNewProduct } from '../features/Products/productsSlice.js';
import { fetchCategories } from '../features/Categories/categoriesSlice.js';
import { ProductValidationSchema } from '../schema/product';

type FormInputs = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(ProductValidationSchema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const onSubmit: SubmitHandler<FormInputs> = async (product: ProductType) => {
    try {
      await dispatch(addNewProduct(product));
      toast.success('Product added successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        type: 'success',
      });
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.message, {
        type: 'error',
      });
    }
  };

  return (
    <div className="card ml-4 mt-4 w-full max-w-4xl flex-shrink-0 bg-base-100 shadow-lg shadow-slate-400 drop-shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                className=" input input-info "
                type="text"
                placeholder="Name"
                {...register('name')}
              />
              {errors.name?.message && (
                <Alert severity="error" className="my-1 mb-2" variant="filled">
                  {errors.name?.message}
                </Alert>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                className=" input input-info"
                type="number"
                placeholder="Price"
                {...register('price')}
              />
              {errors.price?.message && (
                <Alert severity="error" className="my-1 mb-2" variant="filled">
                  {errors.price?.message}
                </Alert>
              )}
            </div>
          </div>
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-info w-full "
              {...register('category', { required: true })}
            >
              <option disabled selected value="">
                Select Category
              </option>
              {categories?.map((category, idx) => (
                <option key={idx + 1} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <Alert severity="error" className="my-1 mb-2" variant="filled">
                Please select a category
              </Alert>
            )}
          </div>
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              className=" input input-info "
              type="text"
              placeholder="Image"
              {...register('image')}
            />
            {errors.image?.message && (
              <Alert severity="error" className="my-1 mb-2" variant="filled">
                {errors.image?.message}
              </Alert>
            )}
          </div>
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-info"
              placeholder="Description"
              {...register('description')}
            />

            {errors.description?.message && (
              <Alert severity="error" className="my-1 mb-2" variant="filled">
                {errors.description?.message}
              </Alert>
            )}
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn  border-2 border-cyan-400  bg-sky-400 py-2 px-4 text-base font-bold text-white shadow shadow-sky-400 hover:bg-sky-500 "
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
