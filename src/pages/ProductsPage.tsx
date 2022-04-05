import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice.js';
import Product from '../components/Product';
import { ProductType } from '../types';

function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="py-2 px-20">
      <h1 className="text-left text-[25px] font-bold italic ">Products</h1>
      <div className="grid grid-cols-4 gap-x-4 py-4">
        {products?.map((product: ProductType) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
