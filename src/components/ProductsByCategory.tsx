import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { getCategoryDetails } from '../features/Categories/categorySlice.js';
import ProductCard from './ProductCard';
import { ProductType } from '../types';

function ProductsByCategory() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { category, loading } = useSelector((state: any) => state.category);
  useEffect(() => {
    dispatch(getCategoryDetails(id));
  }, [dispatch, id]);
  const products = category?.category?.products?.filter(
    (product: ProductType) => product.status === 0
  );
  return (
    <div className="min-h-screen py-2 px-20">
      {!loading && (
        <>
          <h1 className="text-left text-[25px] font-bold italic ">
            {category?.category?.name}
          </h1>
          <div className="grid grid-cols-4 gap-x-4 py-4">
            {products?.map((product: ProductType) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>
        </>
      )}
      {loading && (
        <div className=" absolute top-1/2 right-1/2 flex min-h-fit items-center justify-center">
          <PacmanLoader color="#34d399" margin={2} />
        </div>
      )}
    </div>
  );
}

export default ProductsByCategory;
