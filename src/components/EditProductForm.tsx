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
import { uploadSingleFile } from '../utils/uploadFile';

type FormInputs = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  status: number;
};

function EditProduct() {
  const [loading, setLoading] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<FormInputs>({ resolver: yupResolver(ProductValidationSchema) });
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const product = useSelector((state: any) =>
    id ? selectProductById(state, id) : null
  );
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    resetField('image');
  };
  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [id, product, reset]);

  const onSubmit: SubmitHandler<FormInputs> = async (product: ProductType) => {
    try {
      setLoading(true);
      const file = product.image[0];
      if (selectedImage !== null) {
        const imgUrl = await uploadSingleFile(file);
        product.image = imgUrl;
      }
      await dispatch(updateProduct(product));
      toast.success('Product updated successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setLoading(false);
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.message, {
        type: 'error',
      });
    }
  };

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
                  <span className="label-text font-semibold">Price</span>
                </label>
                <input
                  className=" input input-info border-2"
                  type="number"
                  placeholder="Price"
                  {...register('price')}
                />
                {errors.price?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors.price?.message}
                  </Alert>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="form-control my-2">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <select
                  className="select select-info w-full "
                  {...register('category', { required: true })}
                >
                  {categories?.map((category, idx) => (
                    <option key={idx + 1} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    Please select a category
                  </Alert>
                )}
              </div>
              <div className="form-control my-2">
                <label className="label">
                  <span className="label-text font-semibold">Stock</span>
                </label>
                <input
                  className=" input input-info border-2"
                  type="number"
                  placeholder="Stock"
                  {...register('stock')}
                />
                {errors.stock?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors.stock?.message}
                  </Alert>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <div className="form-control my-2">
                  <label className="label">
                    <span className="label-text font-semibold">Image</span>
                  </label>
                  <input
                    className=" input input-info border-2 "
                    type="file"
                    accept="image/*"
                    placeholder="Image"
                    {...register('image')}
                    onChange={imageChange}
                  />
                  {errors.image?.message && (
                    <Alert
                      severity="error"
                      className="my-1 mb-2"
                      variant="filled"
                    >
                      {errors.image?.message}
                    </Alert>
                  )}
                </div>
                <div className="form-control my-2">
                  <label className="label">
                    <span className="label-text font-semibold">Status</span>
                  </label>
                  <div className="flex gap-x-3">
                    <div className=" flex items-center">
                      <input
                        type="radio"
                        {...register('status')}
                        className="radio radio-accent"
                        value={0}
                        {...(product?.status === 0 && { checked: true })}
                      />
                      <label className="label">
                        <span className="label-text font-semibold text-teal-500">
                          Active
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        {...register('status')}
                        className="radio border-roseLight  checked:bg-roseLight"
                        value={1}
                        {...(product?.status === 1 && { checked: true })}
                      />
                      <label className="label">
                        <span className="label-text font-semibold text-roseLight">
                          Inactive
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
              <div className="form-control my-2">
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  className="textarea textarea-info h-24 border-2"
                  placeholder="Description"
                  {...register('description')}
                />

                {errors.description?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors.description?.message}
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
                  update
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
      {selectedImage ? (
        <div>
          <div className="rounded px-4 py-2 ">
            <h1 className="font-semibold text-gray-600">Image Preview</h1>
            <div>
              <img src={URL.createObjectURL(selectedImage)} alt="" />
            </div>
            <button type="button" onClick={removeSelectedImage}>
              Remove This Image
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="rounded px-4 py-2 ">
            <h1 className="font-semibold text-gray-600">Image Preview</h1>
            <div>
              <img src={product?.image} alt="" />
            </div>
            <button type="button" onClick={removeSelectedImage}>
              Remove This Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProduct;
