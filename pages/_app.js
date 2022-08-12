import { Provider } from 'react-redux'
import { store, wrapper } from '../store/configureStore'
import styles from './../assets/scss/styles.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // import Font Awesome CSS
config.autoAddCss = false
import theme from './theme'
import LayoutUser from '../components/LayoutUser'
import LayoutAdmin from '../components/LayoutAdmin'
import { ThemeProvider } from 'styled-components'
function MyApp({ Component, pageProps }) {
  const layouts = {
    L1: LayoutUser,
    L2: LayoutAdmin,
  }
  const Layout = layouts[Component.layout] || (children => <>{children}</>)

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

export default wrapper.withRedux(MyApp)
