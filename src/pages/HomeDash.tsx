import React, { useEffect } from 'react';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ArchiveIcon from '@mui/icons-material/Archive';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/Products/productsSlice.js';
import { fetchUsers } from '../features/Users/usersSlice.js';

function HomeDash() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: any) => state.products);
  const { users } = useSelector((state: any) => state.users);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {
    document.title = 'Dashboard';
  });
  return (
    <div className="px-4">
      <div className="stats w-full bg-orangeLight shadow-lg shadow-orangeLight drop-shadow-lg">
        <div className="stat">
          <div className="stat-figure text-yellowLight">
            <ArchiveIcon fontSize="large" />
          </div>
          <div className="stat-title text-white">Products</div>
          <div className="stat-value text-white">{products?.length}</div>
          <div className="stat-desc text-white">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-yellowLight">
            <AccessibilityNewIcon fontSize="large" />
          </div>
          <div className="stat-title text-white">Users</div>
          <div className="stat-value text-white">{users?.length}</div>
          <div className="stat-desc text-white">↗︎ 1 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-yellowLight">
            <LocalShippingIcon fontSize="large" />
          </div>
          <div className="stat-title text-white">Orders</div>
          <div className="stat-value text-white">1,200</div>
          <div className="stat-desc text-white">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
}

export default HomeDash;
