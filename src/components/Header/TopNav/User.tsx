import React from 'react';

function User() {
  return (
    <div className="dropdown-end  dropdown">
      <button
        type="button"
        tabIndex={0}
        className="avatar btn btn-ghost btn-circle"
      >
        <div className="w-10 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=33791" alt="img" />
        </div>
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default User;
