import React from 'react';
import SmallInfo from '../components/SmallInfo';
import BannerSlider from '../components/Hero/BannerSlider';

function HomePage() {
  React.useEffect(() => {
    document.title = 'Home';
  });
  return (
    <div className="pb-6">
      <BannerSlider />
      <SmallInfo />
    </div>
  );
}

export default HomePage;
