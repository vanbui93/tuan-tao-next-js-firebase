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
                <Link className='breadcrumb__link' href='/'>
                  <a>Trang chủ</a>
                </Link>
                <Link className='breadcrumb__link' href={val.to}>
                  <a>{val.label}</a>
                </Link>
                <Link className='breadcrumb__link' href=''>
                  <a>{productName}</a>
                </Link>
              </li>
            )
          )
        })}
      </ul>
    </div>
  )
}
