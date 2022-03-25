import React from 'react';

type Props = any;

function Header(props: Props) {
  return (
    <div className=" mx-auto w-full rounded-l-2xl bg-pink-500 bg-gradient-to-br from-pink-300 to-pink-600 pb-24 shadow-md md:px-4">
      <nav className="flex items-center justify-between py-8">
        <h1 className="px-4 pt-4 text-2xl uppercase text-white">Dashboard</h1>
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
  );
}

export default Header;
