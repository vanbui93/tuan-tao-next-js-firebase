import { Provider } from 'react-redux'
import { store, wrapper } from '../store/configureStore'
import styles from './../assets/scss/styles.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // import Font Awesome CSS
config.autoAddCss = false
import LayoutUser from '../layouts/LayoutUser'
import LayoutAdmin from '../layouts/LayoutAdmin'
import { ThemeProvider } from 'styled-components'
import { createTheme } from '@material-ui/core'
import { useEffect, useState } from 'react'
function MyApp({ Component, pageProps }) {
  let theme = createTheme({
    zIndex: {
      appBar: 1200,
      drawer: 1900,
    },
  })

  const layouts = {
    L1: LayoutUser,
    L2: LayoutAdmin,
  }
  const Layout = layouts[Component.layout] || (children => <>{children}</>)

  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </>
    )
  }
}

export default wrapper.withRedux(MyApp)
