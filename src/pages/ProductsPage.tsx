import React, { useState } from 'react';
import { ProductType } from '../types';
import Product from '../components/Product';

function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: '1',
      name: 'Product 1',
      price: '$100',
    },
    {
      id: '2',
      name: 'Product 2',
      price: '$200',
    },
    {
      id: '3',
      name: 'Product 3',
      price: '$300',
    },
  ]);
  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
