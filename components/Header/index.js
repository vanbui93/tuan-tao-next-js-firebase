import { limitToLast, onValue, orderByChild, query, ref } from 'firebase/database'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as hamgugerActions from './../../store/actions/mobileMenu'
import { db } from './../../utils/firebase'
import MenuHamburger from './../MenuHamburger'
import SearchResult from './../SearchResult'

export default function Header(props) {
  const { headerData } = props
  const showhamburger = useSelector(state => state.hambuger.showhamburger)
  const dispatch = useDispatch()

  const openHambugerMenu = () => {
    dispatch(hamgugerActions.showHamburger())
  }

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(false)
  }

  const [products, setProducts] = useState({})
  //Lấy tất cả sản phẩm từ bảng `products`
  useEffect(() => {
    const productRef = query(ref(db, `products`), orderByChild('name'), limitToLast(50))
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

  const [menus, setMenus] = useState({})
  //Lấy tất cả sản phẩm từ bảng `products`
  useEffect(() => {
    const menusRef = ref(db, `menus`)
    onValue(menusRef, snapshot => {
      if (snapshot.val() !== null) {
        setMenus({ ...snapshot.val() })
      } else {
        setMenus({})
      }
    })
    return () => {
      setMenus({})
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = e => {
    let value = e.target.value
    setSearchTerm(value)
    setShowModal(true)
  }

  useEffect(() => {
    const results =
      Object.entries(products)?.filter(([key, val]) => {
        return Object.values(val).join('').toLowerCase().includes(searchTerm.toLowerCase())
      }) ?? []
    setSearchResults(results)
  }, [searchTerm, products])

  const listSearch = () => {
    return (
      showModal && (
        <div>
          <SearchResult result={searchResults} toggleModal={toggleModal} />
        </div>
      )
    )
  }

  return (
    <header>
      <div className='header'>
        <div className='container'>
          <div className='header-inner'>
            <h1 className='logo'>
              <Link href='/'>
                <a>
                  <img src={headerData?.logo_img} alt={headerData?.logo_alt} />
                </a>
              </Link>
            </h1>
            <div className='search'>
              <form action='true' className='search-form'>
                <input
                  type='text'
                  placeholder='Bạn cần tìm gì?'
                  id='search'
                  className='text-input'
                  onChange={handleSearch}
                  autoComplete='off'
                />
              </form>
              {listSearch()}
            </div>
            <ul className='header-right'>
              <li>
                <a href={`tel:${headerData?.phone}`}>
                  <span className='phone-icon'>
                    <i className='fa fa-phone' aria-hidden='true' />
                  </span>
                  <span className='call'>
                    {headerData?.phone_text}
                    <span className='hotline'>{headerData.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <Link href={`page/${headerData.header_content?.header_link_01}`}>
                  <a>
                    <i className='fa fa-credit-card' aria-hidden='true' />
                    {headerData.header_content?.header_text_01}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`page/${headerData.header_content?.header_link_02}`}>
                  <a>
                    <i className='fa fa-refresh' aria-hidden='true' />
                    {headerData.header_content?.header_text_02}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='header-sp'>
        <div className='header-top'>
          <div className='menu-hamberger'>
            <button className='hamberger'>
              <span className='btn-hamberger' onClick={openHambugerMenu}></span>
            </button>
            {showhamburger && <MenuHamburger headerData={headerData} />}
          </div>
          <h1 className='logo-sp'>
            <Link href='/'>
              <a>
                <img src={headerData?.logo_img} alt={headerData?.logo_alt} />
              </a>
            </Link>
          </h1>
          <div className='cart'>
            <Link href='/'>
              <a>
                <i className='fa fa-shopping-cart' aria-hidden='true'></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <nav className='menu'>
        <div className='container-fluid'>
          <div className='menu-inner'>
            <div className='container'>
              <ul className='menu__list'>
                {Object.values(menus)?.map((menu, idx) => {
                  return (
                    <li className='menu__item' key={idx}>
                      <Link href={`/${menu.link}`} className='menu__link'>
                        <a> {menu.name}</a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className='search-sp'>
        <form action='true' className='search-form'>
          <input
            type='text'
            placeholder='Bạn cần tìm gì?'
            id='search'
            className='text-input'
            onChange={handleSearch}
            onClick={handleSearch}
            autoComplete='off'
          />
          {listSearch()}
          {/* <button className="search-icon"><span className="blind">Search</span><i className="fa fa-search" aria-hidden="true" /></button> */}
        </form>
      </div>
    </header>
  )
}
