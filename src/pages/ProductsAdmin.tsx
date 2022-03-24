/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../types';

type Props = {
  products: ProductType[];
  onRemove: (id: string) => void;
};

function ProductsAdmin({ products, onRemove }: Props) {
  return (
    <div>
      <table className="table">
        <thead>
          <th>
            <td>Name</td>
          </th>
          <th>
            <td>Price</td>
          </th>
          <th>
            <td>Image</td>
          </th>
        </thead>
        <tbody>
          {products?.map((product, idx) => (
            <tr key={idx}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <img src={product.image} alt={product.name} className="w-20" />
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    onRemove(product._id);
                  }}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
                <Link to={`${product._id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsAdmin;
