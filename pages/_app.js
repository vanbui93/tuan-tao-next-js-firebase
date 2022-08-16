import { Provider } from 'react-redux'
import { config } from '@fortawesome/fontawesome-svg-core'
import { store, wrapper } from '../store/configureStore'
import styles from '../assets/scss/styles.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import LayoutUser from '../layouts/LayoutUser'
import LayoutAdmin from '../layouts/LayoutAdmin'
import { ThemeProvider } from 'styled-components'
import { createTheme } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import Font Awesome CSS
config.autoAddCss = false

const Loading = () => {
    return (
        <div className='loader'>
            <img src={'/assets/img/loading.gif'} />
        </div>
    )
}

function MyApp({ Component, pageProps }) {
    const [currentPathname, setCurrentPathname] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (router.isReady) {
            if (router.pathname !== currentPathname) {
                setLoading(true)
                setCurrentPathname(router.pathname)
                setTimeout(() => {
                    setLoading(false)
                }, 3000)
            }
        }
    }, [router, router.pathname])

    const theme = createTheme({
        zIndex: {
            appBar: 1200,
            drawer: 1900,
        },
    })

    const layouts = {
        L1: LayoutUser,
        L2: LayoutAdmin,
    }
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return null
    }
    if (typeof window === 'undefined') {
        return <></>
    }
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{loading ? <Loading /> : <Component {...pageProps} />}</ThemeProvider>
        </Provider>
    )
}

export default wrapper.withRedux(MyApp)
