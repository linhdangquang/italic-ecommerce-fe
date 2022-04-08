import React from 'react';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import SearchForm from './SearchForm';
import User from './User';

function TopNav() {
  return (
    <div className="flex items-center border-b bg-base-100 py-2 px-20">
      <div className="pr-2">
        <NavLink
          to="/"
          className="font-DancingScript text-3xl font-bold normal-case"
        >
          LinhDQ
        </NavLink>
      </div>
      <SearchForm />
      <div className="flex items-center">
        <Cart />
        <div>
          <User />
        </div>
      </div>
    </div>
  );
}

export default TopNav;
