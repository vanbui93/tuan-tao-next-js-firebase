import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper'
import { db } from './../../utils/firebase'
import { onValue, ref } from 'firebase/database'

// Import Swiper styles
import 'swiper/css'

export default function CustomerCmt() {
  const [comments, setComments] = useState({})
  //Lấy tất cả sản phẩm từ bảng `comments`
  useEffect(() => {
    const cmtsRef = ref(db, `comments`)
    onValue(cmtsRef, snapshot => {
      if (snapshot.val() !== null) {
        setComments({ ...snapshot.val() })
      } else {
        setComments({})
      }
    })
    return () => {
      setComments({})
    }
  }, [])

  const params = {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 40,
    pagination: {
      clickable: true,
    },
    modules: [FreeMode, Pagination, Navigation, Thumbs],
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 2,
      },
    },
  }

  return (
    <section className='customerCmt'>
      <div className='container'>
        <div className='page-title'>
          <h3>Nhận xét của khách hàng</h3>
        </div>
        <div className='customerCmt__swiper'>
          <Swiper {...params} className='customerCmt__swiper-inner'>
            {Object.values(comments)?.map((cmt, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <div className='customerCmt__item'>
                    <div className='customerCmt__img'>
                      <img src={cmt.image} alt='' />
                    </div>
                    <div className='customerCmt__info'>
                      <h3>{cmt.name}</h3>
                      <h4>{cmt.position}</h4>
                      <div className='customerCmt__note'>{cmt.content}</div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
