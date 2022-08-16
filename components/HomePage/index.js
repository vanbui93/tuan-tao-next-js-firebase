import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUser from '../../layouts/LayoutUser'
import { getComments } from '../../store/actions/cmt'
import { getMain } from '../../store/actions/main'
import { getProduct } from '../../store/actions/products'
import { getPromotions } from '../../store/actions/promotions'
import { getSlides } from '../../store/actions/slides'
import CoreValue from '../CoreValue'
import CustomerCmt from '../CustomerCmt'
import HomeProduct from '../HomeProduct'
import HomeSlide from '../HomeSlide'

const Loading = () => {
    return (
        <div className='loader'>
            <img src={'/assets/img/loading.gif'} />
        </div>
    )
}
function HomePage() {
    const [currentPathname, setCurrentPathname] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (router.isReady) {
            if (router.pathname !== currentPathname) {
                setLoading(true)
                setCurrentPathname(router.pathname)
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            }
        }
    }, [router, router.pathname])

    const dispatch = useDispatch()
    const products = useSelector(state => state.products.data)
    const allSlides = useSelector(state => state.slides.data)
    const cmts = useSelector(state => state.cmt.data)
    const mainData = useSelector(state => state.main.data)

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        dispatch(getSlides())
    }, [])

    useEffect(() => {
        dispatch(getPromotions())
    }, [])

    useEffect(() => {
        dispatch(getComments())
    }, [])

    useEffect(() => {
        dispatch(getMain())
    }, [])

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <LayoutUser>
                    <HomeSlide slideImage={allSlides} />
                    <HomeProduct products={products} />
                    <CustomerCmt comments={cmts} />
                    <CoreValue coreValue={mainData} />
                </LayoutUser>
            )}
        </>
    )
}
HomePage.layout = 'L1'
export default HomePage
