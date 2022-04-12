import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import { CategoryType } from '../types';
import { selectProductById } from '../features/Products/productsSlice.js';
import { addToCart } from '../features/Cart/cartSlice.js';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state: any) => selectProductById(state, id));
  console.log(product);
  const { categories } = useSelector((state: any) => state.categories);
  return (
    <div className="min-h-screen py-2 px-20">
      <div className="breadcrumbs text-xs text-gray-500">
        <ul>
          <li>
            <NavLink to="/">
              <HomeIcon fontSize="small" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to={`/categories/${product?.category}`}>
              {categories?.map((category: CategoryType) => {
                if (category._id === product?.category) {
                  return category?.name;
                }
                return false;
              })}
            </NavLink>
          </li>
          <li>
            <NavLink className="font-semibold" to={`/products/${product?._id}`}>
              {product?.name}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex justify-between gap-x-4 py-2">
        <div className="max-w-2xl md:w-1/2 ">
          <div>
            <img src={product?.image} alt="" />
          </div>
          <div className="py-4">
            <p className="max-w-fit  border-b-[3px] border-blacklight pb-3 font-semibold text-blacklight">
              Details
            </p>
            <p className="py-4 text-gray-500">{product?.description}</p>
          </div>
        </div>

        <div className="pr-20 text-left md:w-[30%]">
          <h2 className="border-b py-4 font-PlayfairDisplay text-2xl">
            {product?.name}
          </h2>
          <div className="py-6">
            <div>
              <div className="mb-5 flex items-center">
                <div>
                  <div className=" relative mr-2">
                    <span className="absolute bottom-1 align-top text-base text-gray-800">
                      $
                    </span>
                    <span className="ml-[10px] align-top font-OpenSans text-[22px] font-semibold leading-[22px]">
                      {product?.price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex w-full">
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-center rounded bg-blacklight py-3 text-white hover:bg-[#2F2F3B]"
                  onClick={() => {
                    dispatch(addToCart(product));
                    // toast('🦄 Add to Cart Success!', {
                    //   position: 'bottom-right',
                    //   autoClose: 2000,
                    //   hideProgressBar: false,
                    //   closeOnClick: true,
                    //   pauseOnHover: true,
                    //   draggable: true,
                    //   progress: undefined,
                    // });
                  }}
                >
                  Add to Cart
                </button>
              </div>
              <div className="mt-2">
                <div className="flex select-none items-center">
                  <CheckIcon className=" text-sm" />
                  <p className="ml-1 text-xs">Free shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
