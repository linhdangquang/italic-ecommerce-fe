import React from 'react';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { ProductType } from '../types';
import { USDFormat } from '../utils/currencyFormat';

type Props = {
  product: ProductType;
};

function Product({ product }: Props) {
  const { name, price, _id, image, createdAt } = product;
  console.log(product);
  return (
    <div className="p-2 shadow drop-shadow-md">
      <p>{name}</p>
      <p>{USDFormat(price)}</p>
      <img src={image} alt={image} />
      <p>{dayjs(createdAt).format('HH:mm - DD/MM/YYYY')}</p>
      <Link to={`/products/${_id}`} className="btn">
        BUY
      </Link>
    </div>
  );
}

export default Product;
