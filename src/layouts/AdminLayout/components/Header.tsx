import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import User from '../../WebLayout/components/Header/TopNav/User';

function Header() {
  const { user } = useSelector((state: any) => state.auth);
  const now = dayjs();
  return (
    <div className=" mx-auto w-full rounded-l-2xl  md:px-4">
      <nav className="flex items-center justify-between py-8">
        <div className="mr-4 flex w-full items-center justify-between gap-2">
          <form action="">
            <div className="relative flex shadow-md">
              <input
                type="text"
                placeholder="Search here..."
                className="rounded border-2 border-sky-600 py-2 px-4 pr-8 outline-none transition-colors placeholder:italic  focus:border-sky-700 focus:shadow-sm focus:shadow-sky-400"
              />
              <button
                type="button"
                className="absolute right-0 items-center px-2 pt-[5px] text-xl text-gray-400 hover:text-sky-600"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
          <User />
        </div>
      </nav>
      <div>
        <h2 className="flex gap-x-2 font-mono text-3xl font-semibold">
          Good {now.hour() < 12 ? 'Morning ' : 'Afternoon '}
          <p className="text-black underline"> {user?.user?.name}</p>
        </h2>
      </div>
    </div>
  );
}

export default Header;
