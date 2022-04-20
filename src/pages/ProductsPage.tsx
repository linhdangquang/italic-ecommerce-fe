import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
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
  React.useEffect(() => {
    document.title = 'Products';
  }, []);
  return (
    <div className="min-h-screen py-2 px-20 pb-20">
      <div className="breadcrumbs text-xs text-gray-500">
        <ul>
          <li>
            <Link to="/">
              <HomeIcon fontSize="small" />
              Home
            </Link>
          </li>
          <li>
            <Link className="font-semibold" to="/products">
              Products
            </Link>
          </li>
        </ul>
      </div>
      <h1 className="text-left text-lg font-bold italic ">Products</h1>
      {!loading && (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
