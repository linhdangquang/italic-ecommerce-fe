import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { RiHome6Line } from 'react-icons/ri';
import { AiOutlineInbox } from 'react-icons/ai';

type Props = any;

function AdminLayout(props: Props) {
  return (
    <div className="container-fluid admin-container font-fira flex flex-row bg-gray-100">
      <nav className="flex min-h-screen w-64 flex-row pr-14 ">
        <div className="fixed top-0 left-0 z-50 flex h-full min-h-screen w-56 flex-col overflow-hidden rounded-r-3xl bg-white  ">
          <div className="flex h-20 items-center justify-center shadow-md">
            <h1 className="text-3xl font-black uppercase text-pink-600">
              LinhDQ
            </h1>
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
      <div className="main-content relative ml-4 w-full rounded-l-2xl bg-white">
        <div className=" mx-auto w-full rounded-l-2xl bg-pink-500 bg-gradient-to-br from-pink-300 to-pink-600 pb-24 shadow-md md:px-4">
          <nav className="flex items-center justify-between py-8">
            <h1 className="px-4 pt-4 text-2xl uppercase text-white">
              Dashboard
            </h1>
            <div className="mr-4 flex items-center gap-2">
              <form action="">
                <div className="relative flex shadow-md">
                  <span className="absolute items-center px-2 pt-2 text-xl text-gray-400">
                    <i className="ri-search-line" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="rounded border-0 py-2 pl-4 outline-none placeholder:italic  focus:ring-2 focus:ring-pink-700"
                  />
                </div>
              </form>
              <div className="h-11 w-11 rounded-full">
                <a href="">
                  <img
                    src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"
                    alt=""
                    className="rounded-full"
                  />
                </a>
              </div>
            </div>
          </nav>
          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
              <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                      <h5 className="text-xs font-bold uppercase text-gray-400">
                        Traffic
                      </h5>
                      <span className="text-xl font-semibold text-gray-700">
                        350,897
                      </span>
                    </div>
                    <div className="relative w-auto flex-initial pl-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500 p-3 text-center text-white shadow-lg">
                        <i className="ri-line-chart-fill" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    <span className="mr-2 text-emerald-500">
                      <i className="ri-arrow-up-line" /> 3.48%
                    </span>
                    <span className="whitespace-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
              <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                      <h5 className="text-xs font-bold uppercase text-gray-400">
                        New users
                      </h5>
                      <span className="text-xl font-semibold text-gray-700">
                        2,356
                      </span>
                    </div>
                    <div className="relative w-auto flex-initial pl-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 p-3 text-center text-white shadow-lg">
                        <i className="ri-user-add-line" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    <span className="mr-2 text-red-500">
                      <i className="ri-arrow-down-line" /> 3.48%
                    </span>
                    <span className="whitespace-nowrap"> Since last week </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
              <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                      <h5 className="text-xs font-bold uppercase text-gray-400">
                        Sales
                      </h5>
                      <span className="text-xl font-semibold text-gray-700">
                        924
                      </span>
                    </div>
                    <div className="relative w-auto flex-initial pl-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 p-3 text-center text-white shadow-lg">
                        <i className="ri-user-line" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    <span className="mr-2 text-orange-500">
                      <i className="ri-arrow-down-line" /> 1.10%
                    </span>
                    <span className="whitespace-nowrap"> Since yesterday </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
              <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                      <h5 className="text-xs font-bold uppercase text-gray-400">
                        Performance
                      </h5>
                      <span className="text-xl font-semibold text-gray-700">
                        49,65%
                      </span>
                    </div>
                    <div className="relative w-auto flex-initial pl-4">
                      <div className="bg-lightBlue-500 inline-flex h-12 w-12 items-center justify-center rounded-full p-3 text-center text-black shadow-lg">
                        <i className="ri-percent-fill" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    <span className="mr-2 text-emerald-500">
                      <i className="ri-arrow-up-line" /> 12%
                    </span>
                    <span className="whitespace-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-2">
          <Outlet />
        </div>
        <footer className="footer bg-base-200 p-10 text-base-content">
          <div>
            <span className="footer-title">Services</span>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </footer>
        <footer className="footer border-t border-base-300 bg-base-200 px-10 py-4 text-base-content">
          <div className="grid-flow-col items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" />
            </svg>
            <p>
              ACME Industries Ltd. <br />
              Providing reliable tech since 1992
            </p>
          </div>
          <div className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;
