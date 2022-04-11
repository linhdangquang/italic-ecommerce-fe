import React from 'react';
import { AiOutlineInbox } from 'react-icons/ai';
import { RiHome6Line } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import WebIcon from '@mui/icons-material/Web';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import ReceiptIcon from '@mui/icons-material/Receipt';

function SideBar() {
  return (
    <nav className="flex min-h-screen w-64 flex-row pr-14 ">
      <div className="fixed top-0 left-0 z-50 flex h-full min-h-screen w-56 flex-col overflow-hidden rounded-r-3xl bg-white  ">
        <div className="flex h-20 items-center justify-center shadow-md">
          <h1 className="text-3xl font-black uppercase text-sky-600">LinhDQ</h1>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <NavLink
              to="/admin/dashboard"
              className="AdminLayout__link block h-12 transform items-center text-gray-500 transition-transform duration-200 ease-in hover:translate-x-2 hover:text-gray-800"
            >
              <span className="flex items-center pl-12 text-sm font-medium">
                <RiHome6Line size="1.25rem" />
                Home
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="AdminLayout__link block h-12 transform items-center text-gray-500 transition-transform duration-200 ease-in hover:translate-x-2 hover:text-gray-800"
            >
              <span className="flex items-center pl-12 text-sm font-medium">
                <WebIcon fontSize="small" />
                Web
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className="AdminLayout__link block h-12 transform items-center text-gray-500 transition-transform duration-200 ease-in hover:translate-x-2 hover:text-gray-800"
            >
              <span className="flex items-center pl-12 text-sm font-medium">
                <AiOutlineInbox size="1.25rem" />
                Products
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/categories"
              className="AdminLayout__link block h-12 transform items-center text-gray-500 transition-transform duration-200 ease-in hover:translate-x-2 hover:text-gray-800"
            >
              <span className="flex items-center pl-12 text-sm font-medium">
                <CategoryIcon fontSize="small" />
                Categories
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className="AdminLayout__link block h-12 transform items-center text-gray-500 transition-transform duration-200 ease-in hover:translate-x-2 hover:text-gray-800"
            >
              <span className="flex items-center pl-12 text-sm font-medium">
                <ReceiptIcon fontSize="small" />
                Orders
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className="AdminLayout__link block h-12 transform items-center text-gray-500 transition-transform duration-200 ease-in hover:translate-x-2 hover:text-gray-800"
            >
              <span className="flex items-center pl-12 text-sm font-medium">
                <SupervisedUserCircleIcon fontSize="small" />
                Users
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/banners"
              className="AdminLayout__link block h-12 transform items-center text-gray-500 transition-transform duration-200 ease-in hover:translate-x-2 hover:text-gray-800"
            >
              <span className="flex items-center pl-12 text-sm font-medium">
                <BurstModeIcon fontSize="small" />
                Banners
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
