import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ProductType } from '../types';
import { addProduct } from '../features/Products/productsSlice.js';
import { add } from '../api/products';
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
  console.log(categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const onSubmit: SubmitHandler<FormInputs> = async (product: ProductType) => {
    console.log(product);
    dispatch(addProduct(product));
    await add(product);
    navigate('/admin/products');
  };

  return (
    <div className="card ml-4 mt-4 w-full max-w-4xl flex-shrink-0 bg-base-100 shadow-lg shadow-slate-400 drop-shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className=" input input-bordered input-primary border-2 focus:border-blueSage"
              type="text"
              placeholder="Email"
              {...register('name')}
            />
            {errors.name?.message && (
              <Collapse in>
                <Alert
                  severity="error"
                  variant="filled"
                  action={
                    <IconButton size="small">
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errors.name?.message}
                </Alert>
              </Collapse>
            )}
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn  border-2 border-green-400  bg-blueSage py-2 px-4 text-base font-bold text-white shadow shadow-cyan-400 hover:bg-teal-400 "
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
