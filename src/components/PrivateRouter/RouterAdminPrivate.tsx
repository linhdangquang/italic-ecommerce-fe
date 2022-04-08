import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/localstorage';

type PrivateRouterProps = {
  children: JSX.Element;
};

function RouterAdminPrivate({ children }: PrivateRouterProps) {
  const { user } = isAuthenticated();
  if (user && user.role === 'admin') {
    return children;
  }
  return <Navigate to="/" />;
}

export default RouterAdminPrivate;
