import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { logOut } from '../../../../../features/Auth/authSlice.js';

function User() {
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = async () => {
    await dispatch(logOut());
    toast('Logout success', {
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
            className="dropdown-content menu rounded-box menu-compact w-44 bg-base-100 p-2 shadow shadow-gray-400"
          >
            <div className="px-4">
              <p className="text-base font-medium ">{user.user.name}</p>
              <p className="text-xs text-gray-500">{user.user.email}</p>
            </div>
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <Button size="medium" onClick={onLogout} startIcon={<LogoutIcon />}>
              Logout
            </Button>
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
