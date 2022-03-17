import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = any;

function AdminLayout(props: Props) {
  return (
    <div className="mx-auto">
      {/* HEADER */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
