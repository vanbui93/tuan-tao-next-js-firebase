import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigation } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getProduct } from './../../store/actions/products'
import { numberInputFormat } from './../../utils/numberInputFormat'
export default function ProductRelated(props) {
    const products = useSelector(state => state.products.data)
    const mainData = useSelector(state => state.main.data)
    const { productCollection } = props

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct())
    }, [productCollection])

    const params = {
        spaceBetween: 10,
        navigation: true,
        modules: [Navigation],
        allowTouchMove: true,
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 5,
            },
        },
    }

    const getImgThumb = imgThumb => {
        const img = []
        imgThumb !== undefined &&
            Object.values(imgThumb)?.map(item => {
                if (item !== null) {
                    img.push(item)
                }
            })
        return <img src={img[0]} alt='/' loading='lazy' />
    }

    const getProductRelated = () => {
        return (
            products &&
            Object.entries(products)?.map(([key, val]) => {
                if (val !== null) {
                    const collection = val.collection
                    if (productCollection === collection) {
                        return (
                            <SwiperSlide className='product-related__item' key={key}>
                                <Link className='product-related__link' href={`/product/${key}`}>
                                    <a>
                                        {getImgThumb(val.images)}
                                        <div className='product-related__info'>
                                            <h4 className='product-related__title'>{val.name}</h4>
                                            <p className='product-related__price'>
                                                <strong className='product-related__new-price'>
                                                    {val.price
                                                        ? `${numberInputFormat(val.price.toString())}??`
                                                        : `Li??n h???: ${mainData?.phone}`}
                                                </strong>
                                                {val.price && val.compare_price && (
                                                    <strike className='product-related__compare-price'>
                                                        {numberInputFormat(val.compare_price.toString())} ??
                                                    </strike>
                                                )}
                                            </p>
                                        </div>
                                    </a>
                                </Link>
                            </SwiperSlide>
                        )
                    }
                }
            })
        )
    }

    return (
        <div>
            <Swiper {...params} className='product-related'>
                {getProductRelated()}
            </Swiper>
        </div>
    )
}
