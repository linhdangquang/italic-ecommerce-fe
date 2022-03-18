import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function BottomNav() {
  return (
    <div className="flex justify-between overflow-hidden px-20 py-[1px]  ">
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
      <div className="flex items-center justify-center">
        <ul>
          <li>
            <Link
              to="/"
              className="  rounded-full bg-gray-100 p-1 px-2 text-[13px]  italic  antialiased transition-transform hover:text-black active:scale-90"
            >
              Invite a friend
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BottomNav;
