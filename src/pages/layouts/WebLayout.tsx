import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

type Props = any;

function WebLayout(props: Props) {
  return (
    <div className="mx-auto font-OpenSans">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default WebLayout;
