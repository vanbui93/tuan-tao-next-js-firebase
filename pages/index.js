import Head from 'next/head'
import HomePage from './HomePage'

function Home() {
  return (
    <div>
      <Head>
        <title>Tuấn táo Apple</title>
        <meta name='description' content='Tuấn táo apple - Điện thoại iphone chính hãng' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage />
    </div>
  )
}

export default Home
