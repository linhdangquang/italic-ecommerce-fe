import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

type Props = any;

function Header(props: Props) {
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
          <div className="dropdown dropdown-end h-11 w-11 rounded-full">
            <span tabIndex={0} className="cursor-pointer">
              <img
                src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"
                alt=""
                className="rounded-full"
              />
            </span>
            <ul
              tabIndex={0}
              className="dropdown-content menu mt-2 w-52 rounded-lg border bg-base-100 p-2 shadow-md drop-shadow-lg"
            >
              <li>
                <a className="active:bg-teal-400">
                  <SettingsIcon /> Settings
                </a>
              </li>
              <li>
                <Link to="/" className="active:bg-teal-400">
                  <LogoutIcon /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;