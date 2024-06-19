/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DuAnThucHien.module.scss';
import { faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Item from '../TinTuc/Item';
import axios from 'axios';

const cx = classNames.bind(styles);

function DuAnThucHien() {
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/duanthuchiens').then((response) => {
            setListOfPosts(response.data.data);
        });
    }, []);

    return (
        <div className={cx('container', 'grid', 'wide')}>
            <div className={cx('new_title')}>
                <ul className={cx('breadcrumb', 'title-h2')}>
                    <li className={cx('breadcrumb-item')}>
                        <a href="" title="Trang chủ">
                            Trang chủ
                        </a>
                    </li>
                    <li className={cx('breadcrumb-item')}>
                        <a href="" title="Dự án thực hiện">
                            Dự án thực hiện
                        </a>
                    </li>
                </ul>
            </div>

            <div className={cx('new__product')}>
                <div className={cx('row', 'new__product-item-wrapper')}>
                    {listOfPosts.map((item) => (
                        <Item
                            key={item.id}
                            img={item.AnhDaiDien}
                            // img='./../assets/img/DuAnThucHien/duanthuchien1.jpg'
                            title={item.TieuDe}
                            date={item.createdAt}
                            description={item.MoTa}
                        />
                    ))}
                </div>
            </div>

            <div className={cx('page', 'col', 'c-12')}>
                <ul className={cx('pagination')}>
                    <li className={cx('page-item', 'active')}>
                        <span className={cx('page-link')}>1</span>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="" rel="noindex,nofollow">
                            2
                        </a>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="" rel="noindex,nofollow">
                            3
                        </a>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="" rel="noindex,nofollow">
                            4
                        </a>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="" rel="noindex,nofollow">
                            5
                        </a>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="" rel="noindex,nofollow">
                            6
                        </a>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="" rel="noindex,nofollow">
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </a>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="" rel="noindex,nofollow">
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default DuAnThucHien;
