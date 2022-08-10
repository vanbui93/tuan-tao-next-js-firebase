import { Provider } from 'react-redux'
import { store, wrapper } from '../store/configureStore'
import '../styles/globals.css'

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
