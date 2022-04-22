import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';

function BottomNav() {
  return (
    <div className="flex justify-between overflow-hidden px-4 py-[1px] md:px-20  ">
      <Menu />
      <div className="flex items-center justify-center">
        <ul>
          <li>
            <Link
              to="/"
              className="hidden rounded-full bg-gray-100 p-1 px-2  text-[13px]  italic antialiased transition-transform hover:text-black active:scale-90 sm:block"
            >
              Invite a friend
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BottomNav;
