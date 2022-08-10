import React from 'react'
import ProductItem from 'components/ProductItem';


export const ProductList = (props) => {
    const { products } = props;

    const getDulieu = () => {
        if (products) {
            return Object.values(products).map((val, key) => {
                return (
                    <ProductItem
                        key={key}
                        images={val.images}
                        name={val.name}
                        price={val.price}
                        comparePrice={val.compare_price}
                        newPercent={val.newBox}
                        promotion={val.promotion}
                    />
                )
            })
        }
    }

    return (
        <ul className="collections__list">
            {getDulieu()}
        </ul>
    )
}
