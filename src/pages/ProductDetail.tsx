import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductType } from '../types';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = React.useState<ProductType>();
  React.useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    getProduct();
  }, [id]);
  return <div>{product?.name}</div>;
}

export default ProductDetail;
