import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import SideBar from './components/SideBar';

type Props = any;

function AdminLayout(props: Props) {
  return (
    <div className="container-fluid admin-container font-fira flex flex-row bg-gray-100">
      <SideBar />
      <div className="main-content relative ml-4 w-full rounded-l-2xl bg-white">
        <Header />
        <div className="main-content py-2">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
