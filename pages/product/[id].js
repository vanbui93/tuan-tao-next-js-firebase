import { onValue, ref } from 'firebase/database'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import { db } from './../../utils/firebase'

import { faShield } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import LayoutUser from '../../layouts/LayoutUser'
import ProductRelated from './../../components/ProductRelated'
import ProductSlide from './../../components/ProductSlide'
import VideoReview from './../../components/VideoReview'
import { getColors } from './../../store/actions/colors'
import { getProductDetail } from './../../store/actions/productDetail'
import { getPromotions } from './../../store/actions/promotions'
import { getSkus } from './../../store/actions/skus'
import { getVideo } from './../../store/actions/videos'
import { getWarantys } from './../../store/actions/warantys'
import { numberInputFormat } from '../../utils/numberInputFormat'

export default function ProductDetail(props) {
    const [skus, setSkus] = useState({})
    const [colors, setColors] = useState({})
    const [warantys, setWarantys] = useState({})
    const [videos, setVideos] = useState({})
    const [skuInvalid, setSkuInvalid] = useState(false)
    const [colorInvalid, setColorInvalid] = useState(false)
    const product = useSelector(state => state.product.data)
    const allPromotions = useSelector(state => state.promotions.data)
    const allWarantys = useSelector(state => state.warantys.data)
    const mainData = useSelector(state => state.main.data)
    const router = useRouter()
    const { id } = router.query

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [id])

    useEffect(() => {
        dispatch(getSkus())
    }, [])

    useEffect(() => {
        dispatch(getColors())
    }, [])

    useEffect(() => {
        dispatch(getVideo())
    }, [])

    useEffect(() => {
        dispatch(getWarantys())
    }, [])

    useEffect(() => {
        dispatch(getPromotions())
    }, [])

    const [isSkuSelected, setIsSkuSelected] = useState('init')

    const [isColorSelected, setIsColorSelected] = useState('init')

    // L???y phi??n b???n t??? b???ng m??u `product_sku`
    useEffect(() => {
        const skusRef = ref(db, `product_sku`)
        onValue(skusRef, snapshot => {
            if (snapshot.val() !== null) {
                setSkus({ ...snapshot.val() })
            } else {
                setSkus({})
            }
        })
        return () => {
            setSkus({})
        }
    }, [id])

    // L???y m??u t??? b???ng m??u `product_color`
    useEffect(() => {
        const colorsRef = ref(db, `product_color`)
        onValue(colorsRef, snapshot => {
            if (snapshot.val() !== null) {
                setColors({ ...snapshot.val() })
            } else {
                setColors({})
            }
        })
        return () => {
            setColors({})
        }
    }, [])

    // L???y waranty t??? b???ng `warantys`
    useEffect(() => {
        const warantysRef = ref(db, `warantys`)
        onValue(warantysRef, snapshot => {
            if (snapshot.val() !== null) {
                setWarantys({ ...snapshot.val() })
            } else {
                setWarantys({})
            }
        })
        return () => {
            setWarantys({})
        }
    }, [])

    // video li??n quan t??? b???ng `videos`
    useEffect(() => {
        const warantysRef = ref(db, `videos`)
        onValue(warantysRef, snapshot => {
            if (snapshot.val() !== null) {
                setVideos({ ...snapshot.val() })
            } else {
                setVideos({})
            }
        })
        return () => {
            setVideos({})
        }
    }, [])

    //L???c m??u s???c
    let dataColor = []
    if (product && Object(product.colors).length > 0) {
        const productColor = product.colors
        Object.values(colors).filter(el => {
            return productColor?.some(f => {
                if (f.id === el.id) {
                    dataColor.push(el)
                }
            })
        })
    }

    //L???c phi??n b???n s??? d???ng arr2.some(arr1)
    let dataSku = []
    if (product && Object(product.skus).length > 0) {
        const productSku = product.skus
        Object.values(skus)?.filter(el => {
            return productSku?.some(f => {
                if (f.id === el.id) {
                    dataSku.push(el)
                }
            })
        })
    }

    // L???c b???o h??nh
    let dataWaranty = []
    if (product && Object(product.warantys).length > 0) {
        const productWaranty = product.warantys
        Object.values(warantys)?.filter(el => {
            return productWaranty?.some(f => {
                if (f.id === el.id) {
                    dataWaranty.push(el)
                }
            })
        })
    }

    // L???c video
    let dataVideo = []
    if (product && Object(product.videos).length > 0) {
        const productVideo = product.videos
        Object.values(videos)?.filter(el => {
            if (el) {
                return productVideo?.some(f => {
                    if (f.id === el.id) {
                        dataVideo.push(el)
                    }
                })
            }
        })
    }

    const toggleClassSku = (index, skuId) => {
        setIsSkuSelected(index)
        setSkuSelected(skuId)
        setSkuInvalid(false)
    }

    const toggleClassColor = (index, colorId) => {
        setIsColorSelected(index)
        setColorSelected(colorId)
        setColorInvalid(false)
    }

    const getThumbnail = () => {
        let imgThumb = product.images
        const img = []
        Object.values(imgThumb)?.map(item => {
            if (item !== null) {
                img.push(item)
            }
        })
        return img[0]
    }

    //??i t???i trang gi??? h??ng
    const [skuSelected, setSkuSelected] = useState({})
    const [colorSelected, setColorSelected] = useState({})
    const gotoCheckout = e => {
        e.preventDefault()
        if (
            dataColor.length !== 0 &&
            dataColor.length !== 0 &&
            dataColor.length !== undefined &&
            dataColor.length !== undefined
        ) {
            if (isSkuSelected !== 'init' || isColorSelected !== 'init') {
                router.push(
                    {
                        pathname: '/checkout',
                        query: {
                            productName: product.name ? product.name : '',
                            productPrice: product.price ? product.price : '',
                            productNewBox: product.newBox ? product.newBox : '',
                            productFullBox: product.fullbox ? product.fullbox : '',
                            productSku: skuSelected ? skuSelected : [],
                            productPromotion: product.promotions ? product.promotions : [],
                            productColor: colorSelected ? colorSelected : [],
                            productImage: getThumbnail(),
                        },
                    },
                    '/checkout'
                )
            } else {
                setSkuInvalid(true)
                setColorInvalid(true)
            }
        } else {
            router.push(
                {
                    pathname: '/checkout',
                    query: {
                        productName: product.name ? product.name : '',
                        productPrice: product.price ? product.price : '',
                        productNewBox: product.newBox ? product.newBox : '',
                        productFullBox: product.fullbox ? product.fullbox : '',
                        productPromotion: product.promotions ? product.promotions : [],
                        productImage: getThumbnail(),
                    },
                },
                '/checkout'
            )
        }
    }

    const ckPromotionIds =
        product &&
        product.promotions?.length &&
        product.promotions !== null &&
        product.promotions !== undefined &&
        product.promotions?.map(item => {
            if (item !== null) {
                return item.id
            }
        })

    const ckWarantyIds =
        product &&
        product.warantys?.length &&
        product.warantys !== null &&
        product.warantys !== undefined &&
        product.warantys?.map(item => {
            if (item !== null) {
                return item.id
            }
        })

    return (
        <div>
            <Head>
                <title>{`${product?.name}`}</title>
                <meta name='description' content={`${mainData?.page_title} - ${product?.name}`} />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                {product && (
                    <div className='product-detail'>
                        <div className='container'>
                            <BreadCrumb productName={product?.name} collection={product.collection} />
                            <h2 className='product-detail__title'>{product.name}</h2>
                            <div className='product-detail__content'>
                                <div className='product-detail__info'>
                                    <div className='product-detail__images'>
                                        <ProductSlide productImages={product.images} />
                                    </div>
                                    <div className='product-detail__variant'>
                                        <div className='product-detail__current-price'>
                                            <strong>
                                                {product.price
                                                    ? `${numberInputFormat(product.price.toString())} ??`
                                                    : `Li??n h??? : ${mainData?.phone ? mainData?.phone : ''}`}
                                            </strong>
                                            <i>
                                                <strike>
                                                    {product.compare_price
                                                        ? `${numberInputFormat(product.compare_price.toString())} ??`
                                                        : ''}
                                                </strike>
                                            </i>
                                            &nbsp;&nbsp; | <i>Gi?? ???? bao g???m 10% VAT</i>
                                        </div>
                                        <p className='product-detail__free-ship'>
                                            <span>Mi???n ph?? v???n chuy???n to??n qu???c</span>
                                        </p>
                                        <div className='product-detail__color'>
                                            <div className='option__title'>
                                                {dataColor.length > 0 && (
                                                    <strong className='option__title'>
                                                        L???a ch???n m??u
                                                        {colorInvalid && (
                                                            <span className={colorInvalid ? 'option__highlight' : ''}>
                                                                ( vui l??ng ch???n m??u ! )
                                                            </span>
                                                        )}
                                                    </strong>
                                                )}
                                                <ul className='color'>
                                                    {dataColor?.map((colorId, idx) => {
                                                        return (
                                                            <li
                                                                key={idx}
                                                                className={`color__item ${
                                                                    isColorSelected === idx ? 'selected' : ''
                                                                }`}
                                                                data-sku='IPN1164W'
                                                                data-id='22'
                                                                data-bestprice='12,990,000 ???'
                                                                data-lastprice='21,990,000 ???'
                                                                data-color='#fffc17'
                                                            >
                                                                <span
                                                                    className='color__option'
                                                                    style={{ backgroundColor: `${colorId.data_color}` }}
                                                                    onClick={() =>
                                                                        toggleClassColor(idx, colorId.data_color)
                                                                    }
                                                                >
                                                                    <span className='blind'>{colorId.data_color}</span>
                                                                </span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='product-detail__version'>
                                            <div className='option'>
                                                {dataSku.length > 0 && (
                                                    <strong className='option__title'>
                                                        L???a ch???n dung l?????ng
                                                        {skuInvalid && (
                                                            <span className={skuInvalid ? 'option__highlight' : ''}>
                                                                {' '}
                                                                ( vui l??ng ch???n dung l?????ng ! )
                                                            </span>
                                                        )}
                                                    </strong>
                                                )}
                                                <ul className='option__list'>
                                                    {dataSku?.map((skuId, idx) => {
                                                        return (
                                                            <li
                                                                className={`option__item ${
                                                                    isSkuSelected === idx ? 'selected' : ''
                                                                }`}
                                                                data-sku={skuId.data_sku}
                                                                key={idx}
                                                            >
                                                                <div className='option__wrap'>
                                                                    <label className='option__label'>
                                                                        <strong
                                                                            onClick={() =>
                                                                                toggleClassSku(idx, skuId.memory)
                                                                            }
                                                                        >
                                                                            {skuId.memory}
                                                                        </strong>
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        {ckPromotionIds ? (
                                            <div className='product-detail__promotion'>
                                                <strong>KHUY???N M??I</strong>
                                                <ul className='promotion'>
                                                    {allPromotions !== null &&
                                                        allPromotions !== undefined &&
                                                        Object.values(allPromotions)?.map((ckPromotion, idx) => {
                                                            if (ckPromotionIds?.includes(ckPromotion.id)) {
                                                                return (
                                                                    <li className='promotion__item' key={idx}>
                                                                        <span className='bag'>KM {idx}</span>
                                                                        <span className='promotion__detail'>
                                                                            {ckPromotion.promotion_text}
                                                                        </span>
                                                                        <Link href='/xem-them-khuyen-mai'>
                                                                            <a className='promotion__link'>
                                                                                Xem th??m&gt;&gt;
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            }
                                                        })}
                                                </ul>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <div className='product-detail__purchase'>
                                            <div className='purchase'>
                                                <button
                                                    className='purchase__link'
                                                    data-sku='IPN11128G'
                                                    onClick={e => gotoCheckout(e)}
                                                >
                                                    <strong className='purchase__action'>MUA NGAY</strong>
                                                    <span> Giao t???n nh?? (COD) ho???c Nh???n t???i c???a h??ng</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-detail__waranty'>
                                        <div className='waranty'>
                                            <h4 className='waranty__title'>Th??ng tin s???n ph???m</h4>
                                            <div className='warranty__info'>
                                                {allWarantys &&
                                                    Object.values(allWarantys)?.map((item, idx) => {
                                                        if (ckWarantyIds?.includes(item.id)) {
                                                            return (
                                                                <div className='waranty__item' key={idx}>
                                                                    <span className='waranty__icon'>
                                                                        <FontAwesomeIcon
                                                                            icon={faShield}
                                                                            style={{ color: '#515154' }}
                                                                        />
                                                                        <i
                                                                            className='fa fa-shield'
                                                                            aria-hidden='true'
                                                                        ></i>
                                                                    </span>
                                                                    <p className='waranty__detail'>
                                                                        {parse(item.waranty_text)}
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                <div className='waranty__item waranty__item--more'>
                                                    <Link href={'/page/chinh-sach-bao-hanh'}>
                                                        <a>
                                                            <br />
                                                            Xem chi ti???t
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='product-detail__related'>
                                    <div className='page-title'>
                                        <h3>G???i ?? cho b???n</h3>
                                    </div>
                                    <ProductRelated productCollection={product.collection} />
                                </div>
                                <VideoReview dataVideo={dataVideo} productName={product.name} />
                            </div>
                        </div>
                    </div>
                )}
            </LayoutUser>
        </div>
    )
}
