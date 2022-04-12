import React, { useEffect } from 'react';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ArchiveIcon from '@mui/icons-material/Archive';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { fetchProducts } from '../features/Products/productsSlice.js';
import { fetchUsers } from '../features/Users/usersSlice.js';
import { fetchCategories } from '../features/Categories/categoriesSlice.js';
import CategoryPieChart from '../components/Chart/CategoryPieChart';

function HomeDash() {
  const dispatch = useDispatch();
  const now = dayjs();
  const { products } = useSelector((state: any) => state.products);
  const { users } = useSelector((state: any) => state.users);
  const { orders } = useSelector((state: any) => state.order);
  const { user } = useSelector((state: any) => state.auth);
  const { categories } = useSelector((state: any) => state.categories);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers());
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    document.title = 'Dashboard';
  });
  const categoryLabels = categories.map((category: any) => category.name);
  const productsByCategory = categories.map((category: any) => {
    return products.filter((product: any) => product.category === category._id);
  });
  const quantityByCategory = productsByCategory.map((category: any) => {
    return category.length;
  });
  const data = {
    labels: categoryLabels,
    datasets: [
      {
        label: '# of Votes',
        data: quantityByCategory,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="px-4">
      <div className="pb-4">
        <h2 className="flex gap-x-2 font-mono text-3xl font-semibold">
          Good {now.hour() < 12 ? 'Morning ' : 'Afternoon '}
          <p className="text-black underline"> {user?.user?.name}</p>
        </h2>
      </div>
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
          <div className="stat-value text-white">{orders?.length}</div>
          <div className="stat-desc text-white">↘︎ 90 (14%)</div>
        </div>
      </div>
      <div className="chart py-8">
        <CategoryPieChart data={data} />
      </div>
    </div>
  );
}

export default HomeDash;
