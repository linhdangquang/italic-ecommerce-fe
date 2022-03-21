import React from 'react';
import HeroBanner from '../components/Hero/HeroBanner';
import SmallInfo from '../components/SmallInfo';

function HomePage() {
  return (
    <div className="pb-6">
      <HeroBanner />
      <SmallInfo />
    </div>
  );
}

export default HomePage;
