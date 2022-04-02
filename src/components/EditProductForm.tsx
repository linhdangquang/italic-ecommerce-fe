import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { fetchCategories } from '../features/Categories/categoriesSlice.js';
import { ProductType } from '../types';
import {
  updateProduct,
  selectProductById,
} from '../features/Products/productsSlice.js';
import { ProductValidationSchema } from '../schema/product';

type FormInputs = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

function EditProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(ProductValidationSchema) });
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.categories);
  const loading = useSelector((state: any) => state.products.loading);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const product = useSelector((state: any) =>
    id ? selectProductById(state, id) : null
  );

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [id, product, reset]);

  const onSubmit: SubmitHandler<FormInputs> = async (product: ProductType) => {
    try {
      await dispatch(updateProduct(product));
      toast.success('Product updated successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
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
                className=" input border-2  border-orangeLight focus:border-orangeLight focus:outline-orangeLight"
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
                className=" input border-2 border-orangeLight focus:border-orangeLight focus:outline-orangeLight"
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
              className="select w-full border-2 border-orangeLight focus:border-orangeLight focus:outline-orangeLight "
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
              className=" input border-2 border-orangeLight focus:border-orangeLight focus:outline-orangeLight "
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
              className="textarea border-2 border-orangeLight focus:border-orangeLight focus:outline-orangeLight"
              placeholder="Description"
              {...register('description')}
            />

            {errors.description?.message && (
              <Alert severity="error" className="my-1 mb-2" variant="filled">
                {errors.description?.message}
              </Alert>
            )}
          </div>
          {!loading && (
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn   bg-blueDark py-2 px-4 text-base font-bold text-white shadow shadow-blueDark hover:bg-[#2a326f] "
              >
                Update
              </button>
            </div>
          )}
          {loading && (
            <div className=" absolute top-1/2 right-1/2 flex min-h-fit items-center justify-center">
              <BeatLoader size={20} color="#34d399" margin={2} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
