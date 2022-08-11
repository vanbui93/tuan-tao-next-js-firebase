import { Provider, useDispatch, useSelector } from 'react-redux'
import { store, wrapper } from '../store/configureStore'
import styles from './../assets/scss/styles.scss'
import Header from '../components/Header'
import { getMain } from '../store/actions/main'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // import Font Awesome CSS
config.autoAddCss = false
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch()
  const mainData = useSelector(state => state.main.data)

  useEffect(() => {
    dispatch(getMain())
  }, [])
  return (
    <>
      <Provider store={store}>
        <Header headerData={mainData} />
        <Component {...pageProps} />
        <div className='tel'>
          <a href={`tel:${mainData.phone}`} className='tel-call'>
            <FontAwesomeIcon icon={faPhone} style={{ fontSize: 25, color: '#fff' }} />
          </a>
        </div>
        <Footer footerData={mainData} />
      </Provider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
