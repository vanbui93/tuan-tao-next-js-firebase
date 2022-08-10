import React, { useEffect, useState } from 'react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { db } from 'utils/firebase';
import { onValue, ref } from 'firebase/database';
import parse from "html-react-parser";

export default function HomeSlide() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [slideImage, setSlideImage] = useState({});
  //Lấy tất cả sản phẩm từ bảng `home_slide`
  useEffect(() => {
    const productRef = ref(db, `home_slide`);
    onValue(productRef, (snapshot) => {
      if (snapshot.val() !== null) {
        setSlideImage({ ...snapshot.val() });
      } else {
        setSlideImage({});
      }
    });
    return () => {
      setSlideImage({});
    };
  }, []);

  return (
    <div className="homeSlide">
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Pagination, Navigation, Thumbs]}
        pagination={{
          clickable: true,
        }}
        className="mySwiper2"

        breakpoints={{
          1023: {
            slidesPerView: 1,
            pagination: false,
          },
        }}
      >
        {
          Object.values(slideImage)?.map((val, idx) => {
            return (
              <SwiperSlide
                key={idx}
              >
                <img src={val.image_url} alt='' />
              </SwiperSlide>
            )
          })
        }

      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          Object.values(slideImage)?.map((val, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className='slide-text'>
                  <p>{parse(val.text)}</p>
                </div>
              </SwiperSlide>
            )
          })
        }

      </Swiper>
    </div>
  );
}