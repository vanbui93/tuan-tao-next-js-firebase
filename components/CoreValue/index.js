import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faCartFlatbed, faHeadset, faRefresh } from '@fortawesome/free-solid-svg-icons'

export default function CoreValue(props) {
    const { coreValue } = props
    return (
        <section>
            <div className='container coreValue'>
                <ul className='coreValue__list'>
                    <li className='coreValue__item'>
                        <span className='coreValue__icon'>
                            <FontAwesomeIcon icon={faCheckDouble} style={{ fontSize: 50, color: '#d2d2d7' }} />
                        </span>
                        <div className='coreValue__text'>
                            <span>{coreValue?.core_title_01}</span>
                            <strong>{coreValue?.core_content_01}</strong>
                        </div>
                    </li>
                    <li className='coreValue__item'>
                        <span className='coreValue__icon'>
                            <FontAwesomeIcon icon={faCartFlatbed} style={{ fontSize: 50, color: '#d2d2d7' }} />
                        </span>
                        <div className='coreValue__text'>
                            <span>{coreValue?.core_title_02}</span>
                            <strong>{coreValue?.core_content_02}</strong>
                        </div>
                    </li>
                    <li className='coreValue__item'>
                        <span className='coreValue__icon'>
                            <FontAwesomeIcon icon={faHeadset} style={{ fontSize: 50, color: '#d2d2d7' }} />
                        </span>
                        <div className='coreValue__text'>
                            <span>{coreValue?.core_title_03}</span>
                            <strong>{coreValue?.core_content_03}</strong>
                        </div>
                    </li>
                    <li className='coreValue__item'>
                        <span className='coreValue__icon'>
                            <FontAwesomeIcon icon={faRefresh} style={{ fontSize: 50, color: '#d2d2d7' }} />
                        </span>
                        <div className='coreValue__text'>
                            <span>{coreValue?.core_title_04}</span>
                            <strong>{coreValue?.core_content_04}</strong>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}
