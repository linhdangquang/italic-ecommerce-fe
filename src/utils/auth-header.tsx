import { isAuthenticated } from './localstorage';

const authHeader = () => {
  const user = isAuthenticated();
  if (user && user.token) {
    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  return {};
};

export default authHeader;
