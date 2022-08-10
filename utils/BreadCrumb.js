import React from 'react'
import { NavLink } from 'react-router-dom'
import './../assets/css/breadcrumb.scss'

export default function BreadCrumb(props) {
    const { productName, category } = props;

    const breadrouter = [
        {
            to: '/iphone', label: 'iPhone',
            category: 1
        },
        {
            to: '/phu-kien', label: 'Phụ kiện điện thoại',
            category: 2
        },
    ]

    return (
        <div className="container">
            <ul className="breadcrumb">
                {
                    breadrouter.map((val, idx) => {
                        return (
                            category === val.category &&
                            <li className="breadcrumb__item" key={idx}>
                                <NavLink className="breadcrumb__link" to="/">
                                    Trang chủ
                                </NavLink>
                                <NavLink className="breadcrumb__link" to={val.to}>
                                    {val.label}
                                </NavLink>
                                <NavLink className="breadcrumb__link" to=''>
                                    {productName}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
