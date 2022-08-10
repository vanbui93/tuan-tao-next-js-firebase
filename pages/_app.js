import { Provider } from 'react-redux'
import { store, wrapper } from '../store/configureStore'
import styles from './../assets/scss/styles.scss'
import './../assets/scss/components/common.module.scss'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
