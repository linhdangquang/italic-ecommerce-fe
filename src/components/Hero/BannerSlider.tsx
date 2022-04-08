import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Lazy, Pagination } from 'swiper';
import { fetchBanners } from '../../features/HeroBanner/bannerSlice.js';
import { BannerType } from '../../types';
import HeroBanner from './HeroBanner';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/lazy';
import 'swiper/css/pagination';

function BannerSlider() {
  const dispatch = useDispatch();
  const banners = useSelector((state: any) => state.banner.banner);
  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);
  const activeBanners = banners?.filter((banner: BannerType) => {
    return banner.status === 0;
  });
  return (
    <Swiper
      style={{
        '--swiper-pagination-color': '#fff',
      }}
      effect="fade"
      pagination
      loop
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      lazy
      modules={[Autoplay, EffectFade, Lazy, Pagination]}
    >
      {activeBanners?.map((banner: BannerType) => (
        <SwiperSlide key={banner._id}>
          <HeroBanner data={banner} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BannerSlider;
