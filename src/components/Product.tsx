import React from 'react';

type Product = {
  id: number;
  name: string;
  price: string;
};
type Props = {
  key: number;
  product: Product;
};

function Product(props: Props) {
  console.log(props);
  return <div>Product</div>;
}

export default Product;
