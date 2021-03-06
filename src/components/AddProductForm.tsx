import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { addNewProduct } from '../features/Products/productsSlice.js';
import { fetchCategories } from '../features/Categories/categoriesSlice.js';
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

function AddProduct() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FormInputs>({ resolver: yupResolver(ProductValidationSchema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    resetField('image');
  };
  const onSubmit: SubmitHandler<FormInputs> = async (product: any) => {
    try {
      setLoading(true);
      if (selectedImage !== null) {
        const file = product.image[0];
        product.imageName = file.name;
        const imgUrl = await uploadSingleFile(file);
        product.image = imgUrl;
      } else {
        product.image =
          'https://img.icons8.com/ios-filled/100/000000/no-image.png';
      }
      const data = await dispatch(addNewProduct(product));
      if (data.type !== 'products/addNewProduct/fulfilled') {
        toast.error(data.error.message, {
          type: 'error',
        });
        navigate('/admin/products');
        return;
      }
      toast.success('Product added successfully', {
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
                    className="file:mr-4 file:rounded-full file:border-0
                  file:bg-violet-50 file:py-2
                  file:px-4 file:text-sm
                  file:font-semibold file:text-cyan-500
                  hover:file:bg-violet-100 "
                    type="file"
                    accept="image/*"
                    placeholder="Image"
                    {...register('image')}
                    onChange={imageChange}
                  />
                  {errors?.image && (
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
                        checked
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
      {selectedImage && (
        <div>
          <div className="mt-4 flex h-full flex-col gap-y-2 rounded-md bg-slate-100 px-4 ">
            <h1 className="font-semibold text-gray-600">Image Preview</h1>
            <div>
              <img src={URL.createObjectURL(selectedImage)} alt="" />
            </div>
            <button
              type="button"
              className="btn btn-info mx-auto text-xs text-white shadow-md shadow-cyan-400"
              onClick={removeSelectedImage}
            >
              Remove This Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
