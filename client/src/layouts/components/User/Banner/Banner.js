/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faUser,
    faShoppingBag,
    faGear,
    faSignOut,
    faEarthAsia,
    faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import styles from './Banner.module.scss';
import config from '~/config';
import img from '~/assets/img';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image/Image';
import taikhoanService from '../../../../services/taikhoanService';
import { jwtDecode } from 'jwt-decode';

const cx = classNames.bind(styles);

// function usePlaceholderTyping(inputRef) {
//     const placeholders = ['Bạn cần tìm gì...', 'Đèn trang trí nội thất', 'Đèn trang trí ngoại thất'];

//     useEffect(() => {
//         let currentIndex = 0;
//         let animationTimeout;

//         const typePlaceholder = () => {
//             const placeholderText = placeholders[currentIndex];
//             inputRef.current.setAttribute('placeholder', ''); // Xóa nội dung placeholder

//             let currentLength = 0;
//             const length = placeholderText.length;

//             animationTimeout = setInterval(() => {
//                 if (currentLength <= length) {
//                     inputRef.current.setAttribute('placeholder', placeholderText.substring(0, currentLength));
//                     currentLength++;
//                 } else {
//                     clearInterval(animationTimeout);
//                     setTimeout(deletePlaceholder, 1000); // Sau khi hiển thị, đợi 1 giây trước khi xóa
//                 }
//             }, 30);

//             currentIndex = (currentIndex + 1) % placeholders.length; // Đặt lại currentIndex khi nó đạt cuối mảng
//         };

//         const deletePlaceholder = () => {
//             const placeholderText = inputRef.current.getAttribute('placeholder');
//             const length = placeholderText.length;
//             let currentLength = length;

//             animationTimeout = setInterval(() => {
//                 if (currentLength >= 0) {
//                     inputRef.current.setAttribute('placeholder', placeholderText.substring(0, currentLength));
//                     currentLength--;
//                 } else {
//                     clearInterval(animationTimeout);
//                     setTimeout(typePlaceholder, 500); // Sau khi xóa, đợi 0.5 giây trước khi hiển thị tiếp
//                 }
//             }, 30);
//         };

//         typePlaceholder();

//         return () => clearInterval(animationTimeout);
//     }, [inputRef, placeholders]);
// }

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Tiếng việt',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
    },
];

function Banner() {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    // const [soluong, setSoluong] = useState(0);
    // usePlaceholderTyping(inputRef);

    // const isUserLoggedIn = () => {
    //     const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
    //     return token ? true : false;
    // };

    const isUserLoggedIn = () => {
        const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
        if (!token) {
            localStorage.removeItem('token');
            return false;
        }
        return true;
    };

    // useEffect(() => {
    //     const storedSoluong = localStorage.getItem('soluong');
    //     if (storedSoluong) {
    //         setSoluong(parseInt(storedSoluong, 10));
    //     }
    // }, [soluong]);

    const getAccountInfoFromToken = () => {
        const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
        if (token) {
            const decodedToken = jwtDecode(token.split('=')[1]);
            const thongtin = decodedToken.data;
            localStorage.setItem('token', JSON.stringify(thongtin));
            return decodedToken;
        }
        return null;
    };

    const currentUser = isUserLoggedIn();

    useEffect(() => {
        if (currentUser) {
            getAccountInfoFromToken();
        }
    }, [currentUser]);

    const handleMenuChange = async (menuItem) => {
        switch (menuItem.type) {
            case 'logout':
                try {
                    await taikhoanService.logout();
                    localStorage.removeItem('token');
                    navigate(config.routes.login);
                } catch (err) {
                    console.error('Logout failed:', err);
                }
                break;
            default:
        }
    };

    const handleCartClick = () => {
        if (!isUserLoggedIn()) {
            alert('Bạn cần phải đăng nhập trước khi mua hàng');
            navigate(config.routes.login);
        } else {
            navigate(config.routes.giohang);
        }
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            const query = inputRef.current.value;
            if (query) {
                navigate(`/user/search?q=${encodeURIComponent(query)}`);
            }
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Thông tin cá nhân',
            to: '/@thuan',
        },
        {
            icon: <FontAwesomeIcon icon={faFileInvoice} />,
            title: 'Đơn hàng',
            to: '/user/orders',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            type: 'logout',
            separate: true,
        },
    ];

    return (
        <div className={cx('banner')}>
            <div className={cx('banner-wrapper')}>
                <div className={cx('banner-top')}>
                    <div className={cx('banner-item')}>
                        <img src={img.header.banner1} alt="" className={cx('banner-img')} />
                    </div>
                    <div className={cx('banner-item')}>
                        <img src={img.header.banner2} alt="" className={cx('banner-img')} />
                    </div>
                </div>
                <div className={cx('banner-bot')}>
                    <div className={cx('banner_search')}>
                        <div className={cx('search_item')}>
                            <div className={cx('search-text')}>
                                <div className={cx('search-text-wrap')}>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className={cx('pass')}
                                        placeholder="Bạn cần tìm gì..."
                                        onKeyDown={handleSearchKeyDown}
                                    />
                                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('banner_name')}>
                        <div className={cx('banner_logo')}>
                            <img src={img.header.bannerBot} alt="" className={cx('logo')} />
                            <img src={img.header.bannerBotName} alt="" className={cx('name')} />
                        </div>
                    </div>
                    <div className={cx('banner_call')}>
                        <div className={cx('hotline_zalo')}>
                            <a href="tel: 0342615519" className={cx('hotline')}>
                                0123 456 789
                            </a>
                            <a href="https://chat.zalo.me/" className={cx('zalo')}>
                                0123 456 789
                            </a>
                            <p>Hotline - Zalo</p>
                        </div>
                        <div className={cx('cart')}>
                            <button
                                onClick={handleCartClick}
                                className={cx('cart-link')}
                                style={{ backgroundColor: 'transparent' }}
                            >
                                <FontAwesomeIcon className={cx('cart-logo')} icon={faShoppingBag} />
                                {/* <span className={cx('cart-notice')}>{soluong}</span> */}
                            </button>
                        </div>
                        <div className={cx('user')}>
                            <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                                {currentUser ? (
                                    <Image
                                        src="https://th.bing.com/th/id/OIP.qowjj0uncZr72Xi3h7rh2AHaEK?w=266&h=180&c=7&r=0&o=5&pid=1.7"
                                        className={cx('user-avatar')}
                                        alt=""
                                    ></Image>
                                ) : (
                                    <Link to={config.routes.login} className={cx('user-link')}>
                                        <FontAwesomeIcon className={cx('user-logo')} icon={faUser} />
                                    </Link>
                                )}
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
