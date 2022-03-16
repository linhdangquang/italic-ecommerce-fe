import React from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  price: string;
};
type Props = {
  product: Product;
};

function Product({ product }: Props) {
  const { name, price, id } = product;
  return (
    <div>
      <h1>Product</h1>
      <p>{name}</p>
      <p>{price}</p>
      <Link to={`/products/${id}`} className="btn">
        BUY
      </Link>
    </div>
  );
}

export default Product;
