/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';
import config from '~/config';
import axios from 'axios';
import Category from './Category';

const cx = classNames.bind(styles);

function Header() {
    const [loaisp, setLoaiSP] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/loaisanphams').then((response) => {
            setLoaiSP(response.data.data);
        });
    }, []);

    return (
        <div className={cx('header')}>
            <div className={cx('grid', 'wide')}>
                <nav className={cx('header__nav', 'nav_pc')}>
                    <ul className={cx('header__nav-list')}>
                        <li className={cx('header__nav-item')}>
                            <NavLink
                                className={(nav) => cx('menu-item', { active: nav.isActive })}
                                to={config.routes.home}
                            >
                                Trang chủ
                            </NavLink>
                        </li>
                        <li className={cx('header__nav-item')}>
                            <NavLink
                                className={(nav) => cx('menu-item', { active: nav.isActive })}
                                to={config.routes.gioithieu}
                            >
                                Giới thiệu
                            </NavLink>
                        </li>
                        <li className={cx('header__nav-item', 'menu-item')}>
                            <NavLink className={(nav) => cx('menu-item')}>Danh mục</NavLink>
                            <FontAwesomeIcon icon={faAngleDown} />
                            <ul className={cx('subnav')}>
                                <ul className={cx('subnav')}>
                                    {loaisp.map((cate) => (
                                        <Category key={cate.id} id={cate.id} title={cate.TenLoaiSanPham} />
                                    ))}
                                </ul>
                            </ul>
                        </li>
                        <li className={cx('header__nav-item')}>
                            <NavLink
                                className={(nav) => cx('menu-item', { active: nav.isActive })}
                                to={config.routes.khuyenmai}
                            >
                                Khuyến mãi
                            </NavLink>
                        </li>
                        <li className={cx('header__nav-item')}>
                            <NavLink
                                className={(nav) => cx('menu-item', { active: nav.isActive })}
                                to={config.routes.tintuc}
                            >
                                Tin tức
                            </NavLink>
                        </li>
                        <li className={cx('header__nav-item')}>
                            <NavLink
                                className={(nav) => cx('menu-item', { active: nav.isActive })}
                                to={config.routes.duanthuchien}
                            >
                                Dự án thực hiện
                            </NavLink>
                        </li>
                        <li className={cx('header__nav-item')}>
                            <NavLink
                                className={(nav) => cx('menu-item', { active: nav.isActive })}
                                to={config.routes.lienhe}
                            >
                                Liên hệ{' '}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;
