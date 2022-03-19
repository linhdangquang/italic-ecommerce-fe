import React from 'react';

function SearchForm() {
  return (
    <div className="  w-full flex-1 items-center px-2 ">
      <form action="">
        <div className="form-control w-full border-0 ">
          <div className="input-group relative  ">
            <input
              type="text"
              placeholder="Search for products, categories, brands and more"
              className="input h-[40px] w-full !rounded-full border-2 bg-gray-100 !outline-0 ring-0 placeholder:text-slate-600  focus:border-sky-700 focus:bg-inherit "
            />
            <button
              type="button"
              className=" absolute right-2 h-full border-0  bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 hover:text-sky-700"
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
  );
}

export default SearchForm;
