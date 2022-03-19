import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

type Props = any;

function WebLayout(props: Props) {
  return (
    <div className="mx-auto font-OpenSans">
      <Header />
      <main className="px-20 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default WebLayout;
