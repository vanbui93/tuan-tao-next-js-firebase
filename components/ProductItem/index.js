import Link from 'next/link'
import { useSelector } from 'react-redux'
import numberWithCommas from './../../utils/numberWithComas'

export default function ProductItem(props) {
  const { id, name, price, comparePrice, newPercent, images, promotions } = props
  const allPromotions = useSelector(state => state.promotions.data)
  const mainData = useSelector(state => state.main.data)
  const img = []
  images !== null &&
    images !== undefined &&
    Object.values(images)?.map(item => {
      if (item !== null) {
        img.push(item)
      }
    })

  const getPromoDefault = promoDefault => {
    const promo = []
    promoDefault !== undefined &&
      Object.values(promoDefault)?.map(item => {
        if (item !== null) {
          promo.push(item)
        }
      })
  }

  const ckPromotionIds =
    promotions !== null &&
    promotions !== undefined &&
    promotions.length &&
    promotions?.map(item => {
      if (item !== null) {
        return item.promotion_id
      }
    })

  return (
    <li className='collections__item'>
      <Link href={`/product/${id}`} className='collection__link' onClick={() => window.scrollTo(0, 0)}>
        <a>
          <div className='collections__img'>
            <img src={img[0]} alt='' />
          </div>
          <div className='collections__sticker'>
            {newPercent ? (
              <p className='collections__percent-pin'>
                <span>new: {newPercent}%</span>
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='collections__info'>
            <h4 className='collections__title'>{name}</h4>
            <p className='collections__price'>
              <strong className='collections__new-price'>
                {price ? `${numberWithCommas(price)} đ` : `Liên hệ: ${mainData?.phone}`}
              </strong>
              {price && comparePrice && (
                <strike className='collections__compare-price'>{numberWithCommas(comparePrice)} đ</strike>
              )}
            </p>
          </div>
          {ckPromotionIds ? (
            <div className='collections__promotion'>
              <div className='promotion'>
                <div className='promotion__item'>
                  <span className='bag'>KM</span>
                  {getPromoDefault(promotions)}
                  <strong className='promotion__other'>VÀ {promotions ? promotions.length : ''} KM KHÁC</strong>
                </div>
              </div>
              <ul className='promo-list'>
                {allPromotions !== null &&
                  allPromotions !== undefined &&
                  Object.values(allPromotions)?.map((item, idx) => {
                    if (ckPromotionIds?.includes(item.promotion_id)) {
                      return (
                        item && (
                          <li className='promo-list__item' key={idx}>
                            <span className='bag'>KM</span>
                            <span className='promotion__detail'>{item.promotion_text}</span>
                          </li>
                        )
                      )
                    }
                  })}
              </ul>
            </div>
          ) : (
            ''
          )}
        </a>
      </Link>
    </li>
  )
}
