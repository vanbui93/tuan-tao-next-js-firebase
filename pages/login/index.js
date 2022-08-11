import { Box, Button, Card, CardContent, TextField, Typography } from '@material-ui/core'
import { onValue, ref } from 'firebase/database'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import LayoutLogin from '../../components/LayoutLogin'
import { db } from './../../utils/firebase'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import dynamic from 'next/dynamic'

function Login(props) {
  const [userStorage, setUserStorage] = useState(undefined)
  const { classes } = props
  const [userData, setUserData] = useState({})
  const [errorMessages, setErrorMessages] = useState({})

  useEffect(() => {
    setUserStorage(sessionStorage.getItem('user') || '')
  }, [])

  useEffect(() => {
    const userRef = ref(db, `users`)
    return onValue(userRef, snapshot => {
      if (snapshot.val() !== null) {
        setUserData({ ...snapshot.val() })
      } else {
        setUserData({})
      }
    })
  }, [])

  const errors = {
    uname: 'Tên đăng nhập không đúng',
    pass: 'Mật khẩu không đúng',
  }

  const handleLogin = e => {
    e.preventDefault()
    let { uname, pass } = document.forms[0]

    // Find user login info
    const users = Object.values(userData)?.find(user => user.name === uname.value)

    // Compare user info
    if (users) {
      if (users.pass.toString() !== pass.value) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass })
      } else {
        sessionStorage.setItem('user', JSON.stringify(users))
        Router.push('/dashboard/main')
      }
    } else {
      // Username not found
      setErrorMessages({ name: 'uname', message: errors.uname })
    }
  }

  const handleLogout = e => {
    e.preventDefault()
    Router.push('/login')
    sessionStorage.clear('user')
  }

  const redirectAdmin = e => {
    e.preventDefault()
    Router.push('/dashboard/main')
  }

  // Generate JSX code for error message
  const renderErrorMessage = name => {
    if (name === errorMessages.name) {
      return <Typography className={classes.error}>{errorMessages.message}</Typography>
    }
  }

  return (
    <LayoutLogin>
      <div className={classes.background}>
        {!userStorage ? (
          <div className={classes.login}>
            <Card>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className='text-xs-center pb-xs'>
                    <Typography variant='caption' className={classes.title} color='textSecondary' gutterBottom>
                      Đăng nhập để tiếp tục
                    </Typography>
                    <TextField
                      id='username'
                      label='Tên đăng nhập'
                      className={classes.textField}
                      fullWidth
                      name='uname'
                      margin='normal'
                      required
                    />
                    {renderErrorMessage('uname')}
                    <TextField
                      id='password'
                      label='Mật khẩu'
                      className={classes.textField}
                      fullWidth
                      type='password'
                      name='pass'
                      margin='normal'
                      required
                    />
                    {renderErrorMessage('pass')}
                    <Button variant='contained' color='primary' fullWidth type='submit'>
                      Login
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className={classes.login}>
            <Card>
              <CardContent>
                <Typography variant='caption' className={classes.title} color='textSecondary' gutterBottom>
                  Bạn đã đăng nhập
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  type='submit'
                  onClick={handleLogout}
                  style={{ marginBottom: '10px' }}
                >
                  Đăng xuất
                </Button>
                <Box sx={{ mt: 1 }}>
                  <Button variant='contained' color='primary' fullWidth type='submit' onClick={redirectAdmin}>
                    Trang quản trị
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </LayoutLogin>
  )
}

Login.propTypes = {
  classes: PropTypes.object,
}

export default dynamic(() => Promise.resolve(withStyles(styles)(Login)), { ssr: false })
