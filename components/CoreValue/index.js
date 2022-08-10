import React from 'react';

export default function CoreValue() {
    
    return (
        <section>
            <div className="container coreValue">
                <ul className="coreValue__list">
                    <li className="coreValue__item">
                        <span className="coreValue__icon">
                            <i className="fa-solid fa-check-double"></i>
                        </span>
                        <div className="coreValue__text">
                            <span>Sản phẩm</span>
                            <strong>CHÍNH HÃNG</strong>
                        </div>
                    </li>
                    <li className="coreValue__item">
                        <span className="coreValue__icon">
                            <i className="fa-solid fa-cart-flatbed"></i>
                        </span>
                        <div className="coreValue__text">
                            <span>Miễn phí vận chuyển</span>
                            <strong>TOÀN QUỐC</strong>
                        </div>
                    </li>
                    <li className="coreValue__item">
                        <span className="coreValue__icon">
                            <i className="fa-solid fa-headset"></i>
                        </span>
                        <div className="coreValue__text">
                            <span>Hotline hỗ trợ</span>
                            <strong>1900.2091</strong>
                        </div>
                    </li>
                    <li className="coreValue__item">
                        <span className="coreValue__icon">
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </span>
                        <div className="coreValue__text">
                            <span>Thủ tục đổi trả</span>
                            <strong>DỄ DÀNG</strong>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}
