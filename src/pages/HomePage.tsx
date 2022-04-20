import React from 'react';
import SmallInfo from '../components/SmallInfo';
import BannerSlider from '../components/Hero/BannerSlider';
import ProductsPage from './ProductsPage';

function HomePage() {
  React.useEffect(() => {
    document.title = 'Home';
  }, []);
  return (
    <div className="pb-6">
      <BannerSlider />
      <SmallInfo />
      <ProductsPage />
    </div>
  );
}

export default HomePage;
