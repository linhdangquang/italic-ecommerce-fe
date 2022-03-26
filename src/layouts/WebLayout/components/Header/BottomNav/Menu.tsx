import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {
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
      <li>
        <NavLink
          to="about"
          className="NavLink inline-block border-b-2 border-transparent py-2 text-sm transition-transform hover:border-b-2 hover:border-black active:scale-90"
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="admin"
          className="NavLink inline-block border-b-2 border-transparent py-2 text-sm transition-transform hover:border-b-2 hover:border-black active:scale-90"
        >
          Dashboard
        </NavLink>
      </li>
    </ul>
  );
}

export default Menu;
