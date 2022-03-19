import React, { useState, useEffect } from 'react';
import { ProductType } from '../types';
import Product from '../components/Product';
import { getAllProducts } from '../api/products';

function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await getAllProducts();
      setProducts(data);
    };
    getProducts();
  }, []);
  return (
    <div className="py-2">
      <h1 className="text-center text-[2.5rem] font-bold italic ">Products</h1>
      <div className="grid grid-cols-4 px-10 py-4">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
