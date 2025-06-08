/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import NewProduct from './NewProduct';
import Product from './Product';
import Option from './Option';
import styles from './Home.module.scss';
import axios from 'axios';
import img from '~/assets/img';
import { getFirstImage } from '../../getFirstImage';

const cx = classNames.bind(styles);

function Home() {
    const [denchums, setDenChums] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/sanphams/cate/1').then((response) => {
            setDenChums(response.data.data);
        });
        console.log('BASE_URL_DEPLOY:', process.env.REACT_APP_BASE_URL_DEPLOY);
    }, []);

    const [denmams, setDenMams] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/sanphams/cate/2').then((response) => {
            setDenMams(response.data.data);
        });
    }, []);

    const [denthas, setDenThas] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/sanphams/cate/3').then((response) => {
            setDenThas(response.data.data);
        });
    }, []);

    const [newSP, setNewSP] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:5000/sanphams/callTKSP', { ChucNang: 4 }).then((response) => {
            setNewSP(response.data.data);
        });
    }, []);

    const slideWrapperRef = useRef(null);
    const [newProductLength, setNewProductLength] = useState(0);

    useEffect(() => {
        if (slideWrapperRef.current) {
            setNewProductLength(slideWrapperRef.current.offsetWidth);
        }
    }, []);

    const handleClickRight = () => {
        if (slideWrapperRef.current) {
            slideWrapperRef.current.scrollLeft += newProductLength;
        }
    };

    const handleClickLeft = () => {
        if (slideWrapperRef.current) {
            slideWrapperRef.current.scrollLeft -= newProductLength;
        }
    };

    const cateDenChum = [
        {
            title: 'Đèn Chùm Đồng',
        },
        {
            title: 'Đèn Chùm Pha Lê',
        },
        {
            title: 'Đèn Chùm Pha Lê Nến',
        },
        {
            title: 'Đèn Chùm Cổ Điển Châu Âu',
        },
        {
            title: 'Đèn Chùm Hiện Đại',
        },
        {
            title: 'Đèn Chùm Nghệ Thuật',
        },
        {
            title: 'Đèn Chùm Quạt Trần',
        },
    ];

    const cateDenMam = [
        {
            title: 'Đèn Ốp Trần Đồng',
        },
        {
            title: 'Đèn Mâm Pha Lê Ốp trần',
        },
        {
            title: 'Đèn Mâm LED Tròn',
        },
        {
            title: 'Đèn Mâm LED Vuông',
        },
        {
            title: 'Đèn Mâm Hiện Đại',
        },
        {
            title: 'Đèn Trần Phòng Khách Nhỏ, Phòng Ngủ',
        },
        {
            title: 'Đèn Ốp Trần Gỗ',
        },
        {
            title: 'Đèn Ốp Trần Cổ Điển',
        },
        {
            title: 'Đèn Ốp Ban Công - Hành Lang',
        },
    ];

    return (
        <div className={cx('app__container', 'grid', 'wide')}>
            <div className={cx('container-wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col', 'l-12')} style={{ display: 'flex', margin: '0', padding: '0' }}>
                            <div className={cx('container-item', 'col', 'l-3', 'm-4', 'c-6')}>
                                <a href="/" className={cx('container-item-link')}>
                                    <div className={cx('container-img')}>
                                        <img
                                            src={img.header.bannerPhongKhach}
                                            alt=""
                                            className={cx('container-item-img')}
                                        />
                                    </div>
                                    <div className={cx('text-wrapper')}>
                                        <p className={cx('container-item-text')}>
                                            Đèn Phòng Khách
                                            <span>Xem Sản Phẩm</span>
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div className={cx('container-item', 'col', 'l-3', 'm-4', 'c-6')}>
                                <a href="/" className={cx('container-item-link')}>
                                    <div className={cx('container-img')}>
                                        <img
                                            src={img.header.bannerPhongNgu}
                                            alt=""
                                            className={cx('container-item-img')}
                                        />
                                    </div>
                                    <div className={cx('text-wrapper')}>
                                        <p className={cx('container-item-text')}>
                                            Đèn Phòng Ngủ
                                            <span>Xem Sản Phẩm</span>
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div className={cx('container-item', 'col', 'l-3', 'm-4', 'c-6')}>
                                <a href="/" className={cx('container-item-link')}>
                                    <div className={cx('container-img')}>
                                        <img
                                            src={img.header.bannerPhongAn}
                                            alt=""
                                            className={cx('container-item-img')}
                                        />
                                    </div>
                                    <div className={cx('text-wrapper')}>
                                        <p className={cx('container-item-text')}>
                                            Đèn Phòng Ăn
                                            <span>Xem Sản Phẩm</span>
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div className={cx('container-item', 'col', 'l-3', 'm-4', 'c-6')}>
                                <a href="/" className={cx('container-item-link')}>
                                    <div className={cx('container-img')}>
                                        <img
                                            src={img.header.bannerDenCafe}
                                            alt=""
                                            className={cx('container-item-img')}
                                        />
                                    </div>
                                    <div className={cx('text-wrapper')}>
                                        <p className={cx('container-item-text')}>
                                            Đèn Cafe
                                            <span>Xem Sản Phẩm</span>
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('new__product')} style={{ paddingTop: '50px' }}>
                <div className={cx('new__product-title')}>
                    <h3 className={cx('title-h3')}>
                        <a href="/">Sản phẩm mới</a>
                    </h3>
                </div>

                <div className={cx('new__product-btl')}>
                    <FontAwesomeIcon className={cx('btn-left')} icon={faAngleLeft} onClick={handleClickLeft} />
                    <FontAwesomeIcon className={cx('btn-right')} icon={faAngleRight} onClick={handleClickRight} />
                </div>

                <div className={cx('row', 'new__product-item-wrapper', 'den_moi')} ref={slideWrapperRef}>
                    {newSP.map((newproduct) => {
                        const firstUrl = getFirstImage(newproduct.AnhDaiDien);
                        return (
                            <NewProduct
                                key={newproduct.id}
                                id={newproduct.id}
                                img={firstUrl}
                                name={newproduct.TenSanPham}
                                priceOld={newproduct.Gia}
                                priceNew={newproduct.GiaGiam}
                                sale="30"
                            />
                        );
                    })}
                </div>
            </div>

            {/* ĐÈN CHÙM*/}
            <div className={cx('app__container-items')}>
                <div className={cx('app__container-items-title')}>
                    <h2 className={cx('title-h2')}>
                        <a href="">Đèn chùm</a>
                    </h2>
                </div>
                <div className={cx('row')}>
                    <div
                        className={cx('app__container-item-menu', 'col', 'l-2-4', 'm-3', 'c-0')}
                        style={{ paddingRight: '0 !important' }}
                    >
                        <ul className={cx('cate_1')}>
                            {cateDenChum.map((cate, index) => (
                                <Option key={index} title={cate.title} />
                            ))}
                        </ul>

                        <a href="" className={cx('menu-img')}>
                            <img src="./assets/img/Product/denchum0.jpg" alt="" className={cx('avt-img')} />
                        </a>
                    </div>

                    <div className={cx('app__container-item-product', 'col', 'l-2-8', 'c-12', 'den_chum')}>
                        {denchums.map((product) => {
                            const firstUrl = getFirstImage(product.AnhDaiDien);
                            return (
                                <Product
                                    key={product.id}
                                    id={product.id}
                                    img={firstUrl}
                                    name={product.TenSanPham}
                                    priceOld={product.Gia}
                                    priceNew={product.GiaGiam}
                                    sale="30"
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ĐÈN MÂM*/}
            <div className={cx('app__container-items')}>
                <div className={cx('app__container-items-title')}>
                    <h2 className={cx('title-h2')}>
                        <a href="">Đèn mâm</a>
                    </h2>
                </div>
                <div className={cx('row')}>
                    <div
                        className={cx('app__container-item-menu', 'col', 'l-2-4', 'm-3', 'c-0')}
                        style={{ paddingRight: '0 !important' }}
                    >
                        <ul className={cx('cate_1')}>
                            {cateDenMam.map((cate, index) => (
                                <Option key={index} title={cate.title} />
                            ))}
                        </ul>

                        <a href="" className={cx('menu-img')}>
                            <img src="./assets/img/Product/denmam0.jpg" alt="" className={cx('avt-img')} />
                        </a>
                    </div>

                    <div className={cx('app__container-item-product', 'col', 'l-2-8', 'c-12', 'den_chum')}>
                        {denmams.map(({ id, AnhDaiDien, TenSanPham, Gia, GiaGiam }) => {
                            const firstUrl = getFirstImage(AnhDaiDien);
                            return (
                                <Product
                                    key={id}
                                    id={id}
                                    img={firstUrl}
                                    name={TenSanPham}
                                    priceOld={Gia}
                                    priceNew={GiaGiam}
                                    sale="30"
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ĐÈN THẢ*/}
            <div className={cx('app__container-items')}>
                <div className={cx('app__container-items-title')}>
                    <h2 className={cx('title-h2')}>
                        <a href="">Đèn thả</a>
                    </h2>
                </div>
                <div className={cx('row')}>
                    <div
                        className={cx('app__container-item-menu', 'col', 'l-2-4', 'm-3', 'c-0')}
                        style={{ paddingRight: '0 !important' }}
                    >
                        <ul className={cx('cate_1')}>
                            {cateDenMam.map((cate, index) => (
                                <Option key={index} title={cate.title} />
                            ))}
                        </ul>

                        <a href="" className={cx('menu-img')}>
                            <img src="./assets/img/Product/denmam0.jpg" alt="" className={cx('avt-img')} />
                        </a>
                    </div>

                    <div className={cx('app__container-item-product', 'col', 'l-2-8', 'c-12', 'den_chum')}>
                        {denthas.map(({ id, AnhDaiDien, TenSanPham, Gia, GiaGiam }) => {
                            const firstUrl = getFirstImage(AnhDaiDien);
                            return (
                                <Product
                                    key={id}
                                    id={id}
                                    img={firstUrl}
                                    name={TenSanPham}
                                    priceOld={Gia}
                                    priceNew={GiaGiam}
                                    sale="30"
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
