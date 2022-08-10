import { getProduct } from 'actions/products';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';


import 'swiper/swiper.min.css';
import numberWithCommas from 'utils/numberWithComas';
export default function ProductRelated(props) {
    const products = useSelector(state => state.products.data);
    const mainData = useSelector(state => state.main.data);
    const { productCategory } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, [productCategory])

    const params = {
        spaceBetween: 10,
        navigation: true,
        modules: [Navigation],
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 5,
            }
        }
    }

    const getImgThumb = (imgThumb) => {
        const img = [];
        imgThumb !== undefined && Object.values(imgThumb)?.map((item) => {
            if (item !== null) {
                img.push(item);
            }
        });
        return (
            <img src={img[0]} alt='/' loading="lazy" />
        )
    }


    const getProductRelated = () => {
        return products && Object.entries(products)?.map(([key, val]) => {
            if (val !== null) {
                const category = val.category;
                if (productCategory === category) {
                    return (
                        <SwiperSlide className='product-related__item' key={key}>
                            <Link className="product-related__link" to={`/product/${key}`} onClick={() => window.scrollTo(0, 0)}>
                                {
                                    getImgThumb(val.images)
                                }
                                <div className="product-related__info">
                                    <h4 className="product-related__title">{val.name}</h4>
                                    <p className="product-related__price">
                                        <strong className="product-related__new-price">{val.price ? `${numberWithCommas(val.price)}đ` : `Liên hệ: ${mainData?.phone}`}</strong>
                                        {
                                            val.price && val.compare_price &&
                                            <strike className="product-related__compare-price">{numberWithCommas(val.compare_price)} đ</strike>
                                        }
                                    </p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                }
            }

        })
    }

    return (
        <div>
            <Swiper
                {...params}
                className="product-related"
            >
                {
                    getProductRelated()
                }
            </Swiper>
        </div>
    )
}
