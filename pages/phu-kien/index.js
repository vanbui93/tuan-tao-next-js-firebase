import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import LayoutUser from '../../components/LayoutUser'
import { db } from '../../utils/firebase'
import ProductItem from './../../components/ProductItem'

export default function Accessories() {
  const [products, setProducts] = useState({})
  //Lấy tất cả sản phẩm từ bảng `products`
  useEffect(() => {
    const productRef = ref(db, `products`)
    onValue(productRef, snapshot => {
      if (snapshot.val() !== null) {
        setProducts({ ...snapshot.val() })
      } else {
        setProducts({})
      }
    })
    return () => {
      setProducts({})
    }
  }, [])

  const getDulieu = category => {
    return Object.keys(products)?.map((val, key) => {
      if (category === products[val].category) {
        return (
          products[val]?.isDisplay === '1' && (
            <ProductItem
              key={key}
              id={val}
              images={products[val].images}
              name={products[val].name}
              price={products[val].price}
              comparePrice={products[val].compare_price}
              newPercent={products[val].newBox}
              promotions={products[val].promotions}
            />
          )
        )
      }
    })
  }

  return (
    <LayoutUser>
      <div className='collections'>
        <div className='container'>
          <h2 className='collection__title'>Phụ kiện điện thoại</h2>
          <ul className='collections__list'>{getDulieu(2)}</ul>
        </div>
      </div>
    </LayoutUser>
  )
}
