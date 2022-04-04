import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice.js';
import Product from '../components/Product';

function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="py-2">
      <h1 className="text-center text-[2.5rem] font-bold italic ">Products</h1>
      <div className="grid grid-cols-4 px-10 py-4">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
