import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';

type Props = any;

function AdminLayout(props: Props) {
  return (
    <div className="container-fluid admin-container font-fira flex flex-row bg-gray-100 font-OpenSans">
      <SideBar />
      <div className="main-content relative ml-4 w-full rounded-l-2xl bg-white">
        <Header />
        <div className="main-content py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
