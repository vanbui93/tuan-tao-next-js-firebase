import Link from 'next/link'
import React from 'react'

export default function BreadCrumb(props) {
  const { productName, category } = props

  const breadrouter = [
    {
      to: '/iphone',
      label: 'iPhone',
      category: 1,
    },
    {
      to: '/phu-kien',
      label: 'Phụ kiện điện thoại',
      category: 2,
    },
  ]

  return (
    <div className='container'>
      <ul className='breadcrumb'>
        {breadrouter.map((val, idx) => {
          return (
            category === val.category && (
              <li className='breadcrumb__item' key={idx}>
                <Link href='/'>
                  <a className='breadcrumb__link'>Trang chủ</a>
                </Link>
                <Link href={val.to}>
                  <a className='breadcrumb__link'>{val.label}</a>
                </Link>
                <Link href=''>
                  <a className='breadcrumb__link'>{productName}</a>
                </Link>
              </li>
            )
          )
        })}
      </ul>
    </div>
  )
}
