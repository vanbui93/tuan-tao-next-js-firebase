import { onValue, ref } from 'firebase/database'
import parse from 'html-react-parser'
import React, { useEffect, useState } from 'react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { db } from './../../utils/firebase'

export default function HomeSlide(props) {
  const { slideImage } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <div className='homeSlide'>
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        allowTouchMove={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Pagination, Navigation, Thumbs]}
        pagination={{
          clickable: true,
        }}
        className='mySwiper2'
        breakpoints={{
          1023: {
            slidesPerView: 1,
            pagination: false,
          },
        }}
      >
        {slideImage &&
          Object.values(slideImage)?.map((val, idx) => {
            return (
              val && (
                <SwiperSlide key={idx}>
                  <img src={val.image_url} alt={val} />
                </SwiperSlide>
              )
            )
          })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {slideImage &&
          Object.values(slideImage)?.map((val, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className='slide-text'>
                  <p>{parse(val.text)}</p>
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}
