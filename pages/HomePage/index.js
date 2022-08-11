import CoreValue from '../../components/CoreValue'
import CustomerCmt from '../../components/CustomerCmt'
import HomeProduct from '../../components/HomeProduct'
import HomeSlide from '../../components/HomeSlide'

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
