import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { fetchProducts } from '../features/products/productsSlice.js';
import ProductCard from '../components/ProductCard';
import { ProductType } from '../types';

function ProductsPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: any) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const activeProducts = products?.filter((product: ProductType) => {
    return product.status === 0;
  });
  return (
    <div className="min-h-screen py-2 px-20">
      <h1 className="text-left text-[25px] font-bold italic ">Products</h1>
      {!loading && (
        <div className="grid grid-cols-4 gap-x-4 py-4">
          {activeProducts?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {loading && (
        <div className=" absolute top-1/2 right-1/2 flex min-h-fit items-center justify-center">
          <PacmanLoader color="#34d399" />
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
