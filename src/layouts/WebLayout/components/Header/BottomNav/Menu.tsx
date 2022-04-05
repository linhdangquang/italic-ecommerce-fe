import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../../../../features/Categories/categoriesSlice.js';
import { CategoryType } from '../../../../../types';

function Menu() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <ul className="flex gap-6 ">
      <li>
        <NavLink
          to="products"
          className="NavLink inline-block border-b-2 border-transparent py-2 text-sm transition-transform hover:border-b-2 hover:border-black active:scale-90"
        >
          Products
        </NavLink>
      </li>
      {categories?.map((category: CategoryType, idx: number) => (
        <li key={idx + 1}>
          <NavLink
            to={`/products/category/${category._id}`}
            className="NavLink inline-block border-b-2 border-transparent py-2 text-sm transition-transform hover:border-b-2 hover:border-black active:scale-90"
          >
            {category.name}
          </NavLink>
        </li>
      ))}
      <li>
        <NavLink
          to="about"
          className="NavLink inline-block border-b-2 border-transparent py-2 text-sm transition-transform hover:border-b-2 hover:border-black active:scale-90"
        >
          About
        </NavLink>
      </li>
    </ul>
  );
}

export default Menu;
