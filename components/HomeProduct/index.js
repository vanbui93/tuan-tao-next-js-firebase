import { useEffect, useState } from 'react'
import ProductItem from './../../components/ProductItem'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const HomeProduct = props => {
    const { products } = props
    let data = { ...products }

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (products && Object.keys(products)?.length > 0) {
            setLoading(false)
        }
    }, [products])

    var arrayHomeProduct = []
    data !== null &&
        data !== undefined &&
        Object.keys(data)?.map(element => {
            const key = element
            if (data[key] !== null && data[key].fullbox) {
                const id = data[key].id ? data[key].id : ''
                const name = data[key].name ? data[key].name : ''
                const price = data[key].price ? data[key].price : ''
                const comparePrice = data[key].compare_price ? data[key].compare_price : ''
                const images = data[key].images ? data[key].images : ''
                const newPercent = data[key].newBox ? data[key].newBox : ''
                const fullbox = data[key].fullbox ? data[key].fullbox : ''
                const promotions = data[key].promotions ? data[key].promotions : ''
                const isDisplay = data[key].isDisplay ? data[key].isDisplay : ''
                arrayHomeProduct.push({
                    id: id,
                    name: name,
                    price: price,
                    comparePrice: comparePrice,
                    images: images,
                    newPercent: newPercent,
                    fullbox: fullbox,
                    promotions: promotions,
                    isDisplay: isDisplay,
                })
            }
        })

    const currentList = [...arrayHomeProduct]
    const getDulieu = (fullbox, litmits) => {
        const arrFullbox = currentList?.filter(item => {
            if (fullbox === item.fullbox) {
                return item
            }
        })

        return arrFullbox.slice(0, litmits).map((item, idx) => {
            return (
                item?.isDisplay === '1' && (
                    <ProductItem
                        key={idx}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        comparePrice={item.comparePrice}
                        images={item.images}
                        newPercent={item.newBox}
                        promotions={item.promotions}
                    />
                )
            )
        })
    }

    return (
        <section className='collections'>
            <div className='home-collect02 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>iPhone New FullBox</h3>
                </div>
                <ul className='collections__list'>{getDulieu(2, 15)}</ul>
            </div>
            <div className='home-collect01 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>iPhone Đã sử dụng</h3>
                </div>
                <ul className='collections__list'>{getDulieu(1, 15)}</ul>
            </div>
        </section>
    )
}

export default HomeProduct
