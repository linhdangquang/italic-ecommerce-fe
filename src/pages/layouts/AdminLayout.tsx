import React from 'react';
import { Link, Outlet } from 'react-router-dom';

type Props = any;

function AdminLayout(props: Props) {
  return (
    <div className="mx-auto flex gap-x-2 bg-slate-200 ">
      {/* HEADER */}
      <header className=" min-h-screen w-64 rounded-t-3xl  bg-white  shadow-xl drop-shadow-xl ">
        <nav className="">
          <div className="fixed top-0 left-0 z-50 flex h-full min-h-screen w-full flex-col overflow-hidden   ">
            <div className="flex h-20 items-center justify-center shadow-md">
              <h1 className="text-3xl font-black uppercase text-pink-600">
                LinhDQ
              </h1>
            </div>
            <ul className="flex flex-col py-4">
              <li>
                <Link
                  to="/"
                  className="block h-12 transform items-center text-gray-500 transition-transform duration-200 ease-in hover:translate-x-2 hover:text-gray-800"
                >
                  <span className="flex items-center pl-12 text-sm font-medium">
                    <i className=" text-xl" />
                    dasljdksa
                  </span>
                </Link>
              </li>

              <li>
                <a className="logout-btn block h-12 transform cursor-pointer items-center text-gray-500 transition-transform duration-200 ease-in hover:translate-x-2 hover:text-gray-800">
                  <span className="flex items-center pl-12 text-sm font-medium">
                    <i className="ri-logout-circle-line text-xl" />
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="w-full rounded-t-3xl bg-white p-4 ">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
