import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export const isAuthenticated = () => {
  if (!localStorage.getItem('user')) {
    return false;
  }
  // const { token } = JSON.parse(localStorage.getItem('user') as string);
  // if (jwtDecode(token).exp < Date.now() / 1000) {
  //   localStorage.removeItem('user');
  //   return <Navigate to="/login" />;
  // }
  return JSON.parse(localStorage.getItem('user') || '');
};
