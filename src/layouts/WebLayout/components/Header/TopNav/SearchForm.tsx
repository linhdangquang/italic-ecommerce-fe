import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { searchProducts } from '../../../../../api/products';

function SearchForm() {
  const [search, setSearch] = React.useState<any>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isSearching, setIsSearching] = React.useState(false);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleClickOutside = useCallback(() => {
    setSearch([]);
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsSearching(true);
    if (value.length > 2 && !isSearching) {
      const { data } = await searchProducts(value);
      setSearch(data);
      document.addEventListener('click', () => {
        e.target.value = '';
        setSearch([]);
      });
    }
    if (value.length === 0) {
      setIsSearching(false);
      setSearch([]);
    }
  };
  const optimisedVersion = useCallback(debounce(handleChange), []);
  return (
    <div className="  w-full flex-1 items-center px-2 ">
      <form action="">
        <div className="form-control relative w-full border-0 ">
          <div className="input-group relative  ">
            <input
              type="search"
              placeholder="Search for products, categories, brands and more"
              className="input h-[40px] w-full !rounded-full border-2 bg-gray-100 pr-8 !outline-0 ring-0  placeholder:text-slate-600 focus:border-sky-700 focus:bg-inherit "
              onChange={optimisedVersion}
            />
            <button
              type="button"
              className=" absolute right-2 h-full border-0  bg-transparent"
              onClick={() => console.log('clicked')}
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
          <div className="absolute inset-x-0 top-[100%] z-10 rounded-b-lg bg-white px-2 pb-1 shadow-lg md:max-h-[250px]">
            {search?.length > 0 && (
              <div className="flex flex-col p-4">
                {search?.slice(0, 5).map((product: any) => (
                  <div key={product._id} className="flex items-center">
                    <Link
                      to={`/products/${product._id}`}
                      className="text-sm text-gray-900 hover:text-sky-700"
                      onClick={() => {
                        setSearch([]);
                      }}
                    >
                      {product.name}
                    </Link>
                    <div className="avatar">
                      <div className="ml-2 h-8 w-8 rounded">
                        <img src={product.image} alt="" />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-sm text-gray-900">
                  <Link to="/" className="font-semibold hover:text-sky-600">
                    All results ({search?.length})
                    <span className="text-sm italic text-gray-900">
                      {searchValue}
                    </span>
                  </Link>
                </div>
                <div>
                  <span>
                    {search?.length === 0 && isSearching && (
                      <span className="text-sm text-gray-600">
                        No results for {searchValue}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* <div className="">
            {search?.length === 0 && (
              <div className="flex flex-col">Found nothing</div>
            )}
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
