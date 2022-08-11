import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderAdmin from '../../admin_components/HeaderAdmin'
import { getMain } from '../../store/actions/main'

function LayoutAdmin({ children }) {
  const dispatch = useDispatch()
  const mainData = useSelector(state => state.main.data)
  useEffect(() => {
    dispatch(getMain())
  }, [])
  return (
    <div className='layout2'>
      <HeaderAdmin headerData={mainData} />
      {children}
    </div>
  )
}
export default LayoutAdmin
