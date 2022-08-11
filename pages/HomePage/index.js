import CoreValue from '../../components/CoreValue'
import CustomerCmt from '../../components/CustomerCmt'
import HomeProduct from '../../components/HomeProduct'
import HomeSlide from '../../components/HomeSlide'
import LayoutUser from '../../components/LayoutUser'

function HomePage() {
  return (
    <LayoutUser>
      <HomeSlide />
      <HomeProduct />
      <CustomerCmt />
      <CoreValue />
    </LayoutUser>
  )
}
HomePage.layout = 'L1'
export default HomePage
