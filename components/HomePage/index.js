import CoreValue from '../CoreValue'
import CustomerCmt from '../CustomerCmt'
import HomeProduct from '../HomeProduct'
import HomeSlide from '../HomeSlide'
import LayoutUser from '../../layouts/LayoutUser'

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
