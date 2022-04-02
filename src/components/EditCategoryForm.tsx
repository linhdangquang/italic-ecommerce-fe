import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { CategoryType } from '../types/index';
import {
  updateCategory,
  selectCategoryById,
} from '../features/Categories/categoriesSlice.js';
import { CategoryValidationSchema } from '../schema/category';

type FormInputs = {
  name: string;
};

function EditCategoryForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading } = useSelector((state: any) => state.categories);
  const category = useSelector((state: any) =>
    id ? selectCategoryById(state, id) : null
  );
  console.log(category);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(CategoryValidationSchema) });
  const onSubmit: SubmitHandler<FormInputs> = async (
    category: CategoryType
  ) => {
    try {
      const data = await dispatch(updateCategory(category));
      if (data.type !== 'categories/updateCategory/fulfilled') {
        toast.error(data.error.message, {
          type: 'error',
        });
        navigate('/admin/categories');
        return;
      }
      toast.success('Category added successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      navigate('/admin/categories');
    } catch (error) {
      toast.error(error.message, {
        type: 'error',
      });
    }
    console.log(category);
  };
  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);
  return (
    <div className="card ml-4 mt-4 w-full max-w-md flex-shrink-0 bg-base-100 shadow-lg shadow-slate-400 drop-shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className=" absolute top-1/2 right-1/2 flex min-h-fit items-center justify-center">
              <BeatLoader size={20} color="#34d399" margin={2} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditCategoryForm;
