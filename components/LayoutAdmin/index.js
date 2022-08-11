import { withStyles } from '@material-ui/core'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderAdmin from '../../admin_components/HeaderAdmin'
import Sidebar from '../../admin_components/Sidebar'
import { getMain } from '../../store/actions/main'

function LayoutAdmin({ children }) {
  const dispatch = useDispatch()
  const mainData = useSelector(state => state.main.data)
  const opensidebar = useSelector(state => state.ui.opensidebar)
  useEffect(() => {
    dispatch(getMain())
  }, [])

  const handleDrawerOpen = value => {
    if (value === true) {
      dispatch(uiActions.showSidebar())
    } else {
      dispatch(uiActions.hideSidebar())
    }
  }

  return (
    <div className='layout2'>
      <HeaderAdmin headerData={mainData} />
      <div className='wrap-admin'>
        {children}
        <div className='sidebar-wrapper'>
          <Sidebar opensidebar={opensidebar} onToggleSidebar={handleDrawerOpen} />
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(LayoutAdmin), { ssr: false })
