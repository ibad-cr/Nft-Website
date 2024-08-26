import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const HomeSwiperJs = () => {
  const data = useSelector(item => item.shop);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <div className='home-swiper'>
      <div className='swiper-elements'>
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          effect='coverflow'
          grabCursor={true}
          centeredSlides={true}
          initialSlide={4}
          speed={600}
          preventClicks={true}
          slidesPerView='auto'
          spaceBetween={100}
          pagination={{
            el: '.swiper-pagination', // Pagination elementinin sinfi
            clickable: true, // Pagination düymələrinə klikləmə imkanı
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 60,
            depth: 250,
            modifier: 1,
            slideShadows: true,
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {products.slice(9, 18).map((item, index) => (
            <SwiperSlide
              className='swiper-slide'
              key={index}>
              <img src={item.image} alt="" />
              <div className='swiper-slide-title'>{item.title}</div>
            </SwiperSlide>
          ))}

            <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSwiperJs;
