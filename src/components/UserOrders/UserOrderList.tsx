import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function UserOrderList() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  console.log(userId);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (user.user.role === 'admin') {
      toast.warning('Admin do not have orders');
      navigate('/');
    }
  });
  return <div>UserOrderList</div>;
}

export default UserOrderList;
