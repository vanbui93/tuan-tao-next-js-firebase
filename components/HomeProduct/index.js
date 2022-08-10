import { getProduct } from 'actions/products';
import { getPromotions } from 'actions/promotions';
import ProductItem from 'components/ProductItem';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HomeProduct = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.data);

    useEffect(() => {
        dispatch(getProduct());
    }, [])

    useEffect(() => {
        dispatch(getPromotions());
    }, [dispatch]);

    let data = { ...products };

    var arrayHomeProduct = [];
    data !== null && data !== undefined && Object.keys(data)?.map((element) => {
        const key = element;
        if (data[key] !== null) {
            const name = data[key].name ? data[key].name : '';
            const price = data[key].price ? data[key].price : '';
            const comparePrice = data[key].compare_price ? data[key].compare_price : '';
            const images = data[key].images ? data[key].images : '';
            const newPercent = data[key].newBox ? data[key].newBox : '';
            const fullbox = data[key].fullbox ? data[key].fullbox : '';
            const promotions = data[key].promotions ? data[key].promotions : '';
            const isDisplay = data[key].isDisplay ? data[key].isDisplay : '';
            arrayHomeProduct.push({
                id: key,
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

    const currentList = [...arrayHomeProduct];
    const getDulieu = (fullbox, litmits) => {
        const arrFullbox = currentList?.filter(item => {
            if (fullbox === item.fullbox) {
                return item
            }
        })

        return arrFullbox.slice(0, litmits).map((item, idx) => {
            return (
                item?.isDisplay === '1' &&
                <ProductItem
                    key={idx}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    comparePrice={item.compare_price}
                    images={item.images}
                    newPercent={item.newBox}
                    promotions={item.promotions}
                />
            )
        })
    }
    
    return (
        <section className='collections'>
            <div className='home-collect01 container'>
                <div className='page-title'>
                    <h3>iPhone Đã sử dụng</h3>
                </div>
                <ul className="collections__list">
                    {getDulieu(1, 15)}
                </ul>
            </div>
            <div className='home-collect02 container'>
                <div className='page-title'>
                    <h3>iPhone New FullBox</h3>
                </div>
                <ul className="collections__list">
                    {getDulieu(2, 15)}
                </ul>
            </div>
        </section>
    );
}

export default HomeProduct;