import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../../../../../utils/localstorage';

function User() {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);

  return (
    <div>
      {isLoggedIn ? (
        <div className="dropdown-end dropdown">
          <div tabIndex={0} className="avatar btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <img
                src="https://api.lorem.space/image/face?hash=33791"
                alt="img"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact w-48 bg-base-100 p-2 shadow shadow-gray-400"
          >
            <li>
              <p>{user.user.name}</p>
              <p>{user.user.email}</p>
            </li>
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Link to="/signin" className="px-2 text-sm font-black normal-case">
            Sign In
          </Link>
          <Link to="/signup" className="px-2 text-sm font-black normal-case">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default User;
