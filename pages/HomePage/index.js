import CoreValue from './../../components/CoreValue'
import CustomerCmt from './../../components/CustomerCmt'
import HomeProduct from './../../components/HomeProduct'
import HomeSlide from './../../components/HomeSlide'
// import './../../assets/css/home-slide.scss'
// import './../../assets/css/home.scss'
// import './../../assets/css/product-list.scss'

export default function HomePage() {
  return (
    <div>
      <HomeSlide />
      <HomeProduct />
      <CustomerCmt />
      <CoreValue />
    </div>
  )
}
