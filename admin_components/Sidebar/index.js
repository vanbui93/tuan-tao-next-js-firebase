import { ListItem } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/styles'
import Link from 'next/link'
import { PropTypes } from 'prop-types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles'
import dynamic from 'next/dynamic'

function Sidebar(props) {
  const ADMIN_ROUTES = [
    {
      path: '/dashboard/main',
      name: 'Trang quản trị',
    },
    {
      path: '/dashboard/order',
      name: 'Đơn hàng',
    },
    {
      path: '/dashboard/page',
      name: 'Page',
    },
    {
      path: '/dashboard/page_add',
      name: 'Page Add',
    },
    {
      path: '/dashboard/product',
      name: 'Sản phẩm',
    },
    {
      path: '/dashboard/product_add',
      name: 'Thêm Sản phẩm',
    },
    {
      path: '/dashboard/menu',
      name: 'Menu',
    },
    {
      path: '/dashboard/menu_add',
      name: 'Thêm menu',
    },
    {
      path: '/dashboard/user',
      name: 'Tài khoản',
    },
    {
      path: '/dashboard/user_add',
      name: 'Tạo tài khoản',
    },
    {
      path: '/dashboard/slide',
      name: 'Hình slide trang chủ',
    },
    {
      path: '/dashboard/slide_add',
      name: 'Thêm hình slide trang chủ',
    },
    {
      path: '/dashboard/comment',
      name: 'Nhận xét khách hàng',
    },
    {
      path: '/dashboard/comment_add',
      name: 'Thêm nhận xét khách hàng',
    },
    {
      path: '/dashboard/color',
      name: 'Màu Sản phẩm',
    },
    {
      path: '/dashboard/color_add',
      name: 'Thêm màu sắc',
    },
    {
      path: '/dashboard/sku',
      name: 'Dung lượng',
    },
    {
      path: '/dashboard/sku_add',
      name: 'Thêm dung lượng',
    },
    {
      path: '/dashboard/video',
      name: 'Video',
    },
    {
      path: '/dashboard/video_add',
      name: 'Thêm video',
    },
    {
      path: '/dashboard/waranty',
      name: 'Bảo hành',
    },
    {
      path: '/dashboard/waranty_add',
      name: 'Thêm bảo hành',
    },
    {
      path: '/dashboard/promotion',
      name: 'Khuyến mãi',
    },
    {
      path: '/dashboard/promotion_add',
      name: 'Thêm khuyến mãi',
    },
  ]

  const renderList = () => {
    const { classes } = props
    let xhtml = null
    xhtml = (
      <div className={classes.list}>
        <List component='div'>
          {ADMIN_ROUTES?.map((item, index) => {
            return (
              <Link key={index} href={item.path}>
                <a className={({ isActive }) => `${classes.menuLink} ${isActive ? classes.menuLinkActive : ''}`}>
                  <ListItem key={index} className={classes.menuItem} button>
                    {item.name}
                  </ListItem>
                </a>
              </Link>
            )
          })}
        </List>
      </div>
    )
    return xhtml
  }

  const { classes, openSidebar } = props
  return (
    <Drawer
      open={openSidebar}
      onClose={() => this.toggleDrawer(false)}
      variant='persistent'
      anchor='left'
      classes={{
        paper: classes.wrapadmin,
      }}
    >
      {renderList()}
    </Drawer>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  opensidebar: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
}
export default dynamic(() => Promise.resolve(withStyles(styles)(Sidebar)), { ssr: false })
