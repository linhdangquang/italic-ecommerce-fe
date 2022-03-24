import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouterProps = {
  children: JSX.Element;
};

function PrivateRouter({ children }: PrivateRouterProps) {
  const isAdmin = true;
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRouter;
