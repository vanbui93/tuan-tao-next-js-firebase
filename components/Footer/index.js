import Link from 'next/link'
export default function Footer(props) {
  const { footerData } = props
  return (
    <footer className='footer'>
      <div className='container-fluid'>
        <div className='footer__area'>
          <div className='container'>
            {footerData && (
              <div className='footer__inner'>
                <div className='footer__col'>
                  <h3>{footerData.footer_title?.footer_title_01}</h3>
                  <ul className='footer__list'>
                    <li className='footer__item'>
                      <Link href={`/page/${footerData.footer_sub?.link_01}`}>
                        <a>{footerData.footer_sub?.text_01}</a>
                      </Link>
                    </li>
                    <li className='footer__item'>
                      <Link href={`/page/${footerData.footer_sub?.link_02}`}>
                        <a>{footerData.footer_sub?.text_02}</a>
                      </Link>
                    </li>
                    <li className='footer__item'>
                      <Link href={`/page/${footerData.footer_sub?.link_03}`}>
                        <a>{footerData.footer_sub?.text_03}</a>
                      </Link>
                    </li>
                    <li className='footer__item'>
                      <Link href={`/page/${footerData.footer_sub?.link_04}`}>
                        <a>{footerData.footer_sub?.text_04}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='footer__col'>
                  <h3>{footerData.footer_title?.footer_title_02}</h3>
                  <ul className='footer__list'>
                    <li className='footer__item'>
                      <a href={`tel: ${footerData?.phone}`}>
                        <span>Hotline</span>: {footerData?.phone}
                      </a>
                    </li>
                    <li className='footer__item'>
                      <span>Địa chỉ :</span> {footerData?.address}
                    </li>
                  </ul>
                </div>
                <div className='footer__col payment'>
                  <h3>{footerData.footer_title?.footer_title_03}</h3>
                  <ul className='payment__logo'>
                    <li className='payment__item'>
                      <img src={'/assets/img/logo-visa.png'} />
                      <img src={'../assets/img/logo-master.png'} />
                    </li>
                    <li className='payment__item'>
                      <img src={'/assets/img/logo-jcb.png'} />
                      <img src={'/assets/img/logo-samsungpay.png'} />
                    </li>
                    <li className='payment__item'>
                      <img src={'/assets/img/logo-atm.png'} />
                      <img src={'/assets/img/logo-vnpay.png'} />
                    </li>
                  </ul>
                </div>
                <div className='footer__col transfer'>
                  <h3>{footerData.footer_title?.footer_title_04}</h3>
                  <ul className='transfer__list'>
                    <li className='transfer__item'>
                      <img src={'/assets/img/nhattin.jpg'} />
                    </li>
                    <li className='transfer__item'>
                      <img src={'/assets/img/vnpost.jpg'} />
                    </li>
                  </ul>
                  <div className='notice-ministry'>
                    <Link href='/' target='_blank'>
                      <img src={'/assets/img/logo-bct.png'} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
