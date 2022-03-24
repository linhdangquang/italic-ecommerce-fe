import React from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../types';

type Props = {
  product: ProductType;
};

function Product({ product }: Props) {
  const { name, price, _id, image } = product;
  return (
    <div>
      <p>{name}</p>
      <p>{price}</p>
      <img src={image} alt={image} />

      <Link to={`/products/${_id}`} className="btn">
        BUY
      </Link>
    </div>
  );
}

export default Product;
