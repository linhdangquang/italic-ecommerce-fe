import jwtDecode from 'jwt-decode';

export const isAuthenticated = () => {
  if (!localStorage.getItem('user')) {
    return false;
  }
  const { token } = JSON.parse(localStorage.getItem('user') as string);
  if (jwtDecode(token).exp < Date.now() / 1000) {
    localStorage.removeItem('user');
    return false;
  }
  return JSON.parse(localStorage.getItem('user') || '');
};
