import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className="header shadow-md">
      <div className="flex items-center border-b bg-base-100 py-2 px-20">
        <div className="pr-2">
          <NavLink to="/" className="text-xl font-black normal-case">
            LinhDQ
          </NavLink>
        </div>
        <div className="  w-full flex-1 items-center px-2 ">
          <form action="">
            <div className="form-control w-full border-0 ">
              <div className="input-group relative  ">
                <input
                  type="text"
                  placeholder="Search for products, categories, brands and more"
                  className="input h-[40px] w-full !rounded-full border-2 bg-gray-100 !outline-0 ring-0 placeholder:text-slate-600  focus:border-blue-600 "
                />
                <button
                  type="button"
                  className=" absolute right-2 h-full border-0  bg-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex">
          <div className="dropdown-end dropdown">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge indicator-item badge-sm">8</span>
              </div>
            </button>
            <button
              type="button"
              tabIndex={0}
              className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button type="button" className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </button>
          </div>
          <div className="dropdown-end dropdown">
            <button
              type="button"
              tabIndex={0}
              className="avatar btn btn-ghost btn-circle"
            >
              <div className="w-10 rounded-full">
                <img
                  src="https://api.lorem.space/image/face?hash=33791"
                  alt="img"
                />
              </div>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default Header;
