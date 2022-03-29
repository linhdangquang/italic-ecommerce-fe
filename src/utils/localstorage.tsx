export const isAuthenticated = () => {
  if (!localStorage.getItem('user')) {
    return false;
  }
  return JSON.parse(localStorage.getItem('user') || '');
};
