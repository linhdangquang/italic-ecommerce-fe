import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

type Props = any;

function WebLayout(props: Props) {
  return (
    <div className="mx-auto">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default WebLayout;
