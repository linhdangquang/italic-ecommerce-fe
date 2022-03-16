import React, { useState } from 'react';
import Product from '../components/Product';

function ProductsPage() {
  interface Product {
    id: string;
    name: string;
    price: string;
  }
  const [products, setProducts] = useState<Product[]>([
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
