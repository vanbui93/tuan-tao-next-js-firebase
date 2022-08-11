import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faCartFlatbed, faHeadset, faRefresh } from '@fortawesome/free-solid-svg-icons'

export default function CoreValue() {
  return (
    <section>
      <div className='container coreValue'>
        <ul className='coreValue__list'>
          <li className='coreValue__item'>
            <span className='coreValue__icon'>
              <FontAwesomeIcon icon={faCheckDouble} style={{ fontSize: 50, color: '#d2d2d7' }} />
            </span>
            <div className='coreValue__text'>
              <span>Sản phẩm</span>
              <strong>CHÍNH HÃNG</strong>
            </div>
          </li>
          <li className='coreValue__item'>
            <span className='coreValue__icon'>
              <FontAwesomeIcon icon={faCartFlatbed} style={{ fontSize: 50, color: '#d2d2d7' }} />
            </span>
            <div className='coreValue__text'>
              <span>Miễn phí vận chuyển</span>
              <strong>TOÀN QUỐC</strong>
            </div>
          </li>
          <li className='coreValue__item'>
            <span className='coreValue__icon'>
              <FontAwesomeIcon icon={faHeadset} style={{ fontSize: 50, color: '#d2d2d7' }} />
            </span>
            <div className='coreValue__text'>
              <span>Hotline hỗ trợ</span>
              <strong>1900.2091</strong>
            </div>
          </li>
          <li className='coreValue__item'>
            <span className='coreValue__icon'>
              <FontAwesomeIcon icon={faRefresh} style={{ fontSize: 50, color: '#d2d2d7' }} />
            </span>
            <div className='coreValue__text'>
              <span>Thủ tục đổi trả</span>
              <strong>DỄ DÀNG</strong>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
