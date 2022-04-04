import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logOut } from '../../../../../features/Auth/authSlice.js';
import { isAuthenticated } from '../../../../../utils/localstorage';

function User() {
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = async () => {
    await dispatch(logOut());
    toast.success('Logout success', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    navigate('/');
  };

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
              <button type="button" className="btn" onClick={onLogout}>
                Log Out
              </button>
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
