import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneProduct } from '../api/products';
import { ProductType } from '../types';

type ProductEditProps = {
  onEdit: (product: ProductType) => void;
};

type FormInputs = {
  name: string;
  price: number;
  description: string;
  image: string;
};

function EditProduct({ onEdit }: ProductEditProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await getOneProduct(id as string);
      reset(data);
      console.log(data);
    };
    getProduct();
  }, [id]);

  const onSubmit: SubmitHandler<FormInputs> = (product: ProductType) => {
    console.log(product);
    onEdit(product);
    navigate('/admin/products');
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form
        className="flex w-1/3 flex-col gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border-2 border-blacklight p-2"
          type="text"
          {...register('name', { required: true })}
        />
        {errors && errors.name && (
          <p className="text-rose-600">Name is required</p>
        )}
        <input
          className="border-2 border-blacklight p-2"
          type="number"
          {...register('price', { required: true })}
        />
        <input
          className="border-2 border-blacklight p-2"
          type="text"
          {...register('image', { required: true })}
        />
        <input
          className="border-2 border-blacklight p-2"
          type="text"
          {...register('description', { required: true })}
        />
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
