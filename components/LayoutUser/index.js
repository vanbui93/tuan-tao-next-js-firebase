import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMain } from '../../store/actions/main'
import Footer from '../Footer'
import Header from '../Header'

function LayoutUser({ children }) {
  const dispatch = useDispatch()
  const mainData = useSelector(state => state.main.data)
  useEffect(() => {
    dispatch(getMain())
  }, [])
  return (
    <div className='layout1'>
      <Header headerData={mainData} />
      {children}
      <div className='tel'>
        <a href={`tel:${mainData.phone}`} className='tel-call'>
          <FontAwesomeIcon icon={faPhone} style={{ fontSize: 25, color: '#fff' }} />
        </a>
      </div>
      <Footer footerData={mainData} />
    </div>
  )
}
export default LayoutUser
