import { Box, Menu, MenuItem } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import { AccountCircle } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import PropTypes from 'prop-types'
import * as React from 'react'
import styles from './styles'

function HeaderAdmin(props) {
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const { openSidebar, onToggleSidebar } = props

  const handleToggleSidebar = () => {
    console.log(openSidebar)
    if (onToggleSidebar) {
      onToggleSidebar(!openSidebar)
    }
  }
  const handleLogout = e => {
    setAnchorEl(null)
    e.preventDefault()
    Router.push('/login')
    sessionStorage.clear('user')
  }

  const handleProfileMenuOpen = e => {
    setAnchorEl(e.currentTarget)
  }

  const { classes, name } = props
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        {auth && (
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='Open drawer'
              onClick={handleToggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant='h6' noWrap>
              {name}Admin
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleProfileMenuOpen}
                edge='start'
                sx={{
                  marginRight: 5,
                  ...(openSidebar && { display: 'none' }),
                }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleLogout}
              >
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        )}
      </AppBar>
    </Box>
  )
}

HeaderAdmin.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  openSidebar: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  history: PropTypes.object,
}

export default dynamic(() => Promise.resolve(withStyles(styles)(HeaderAdmin)), { ssr: false })
