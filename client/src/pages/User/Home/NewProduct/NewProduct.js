/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './NewProduct.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '~/config';
import cartService from '../../../../services/cartService';
import { getFirstImage } from '../../../getFirstImage';

// import numeral from 'numeral';

const cx = classNames.bind(styles);

function NewProduct({ id, img, name, priceOld, priceNew, sale }) {
    const formatCurrency = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    const navigate = useNavigate();
    const handleBuyNow = async () => {
        const taikhoan = JSON.parse(localStorage.getItem('userinfo'));
        if (!taikhoan) {
            console.error('No account information found in local storage.');
            toast.error('Bạn cần đăng nhập trước khi đặt hàng!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setTimeout(() => {
                navigate(config.routes.login);
            }, 2000);
            return;
        }

        const data = {
            MaSanPham: id,
            MaTaiKhoan: taikhoan.id,
            SoLuong: 1,
        };

        try {
            const response = await cartService.createCart(data);
            toast.success('Thêm sản phẩm vào giỏ hàng thành công!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setTimeout(() => {
                navigate(config.routes.giohang);
            }, 2000);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Thêm sản phẩm vào giỏ hàng thất bại!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };
    const firstUrl = getFirstImage(img);
    return (
        <div className={cx('new__product-item', 'col', 'l-3', 'm-4', 'c-6')}>
            <div className={cx('new__product-img-wrapper')}>
                <NavLink to={`/user/sanpham/${id}`}>
                    <img src={firstUrl} alt={name} className={cx('new__product-img')} />
                </NavLink>
            </div>

            <div className={cx('sale-hot')}>
                <span>{sale}%</span>
            </div>

            <div className={cx('product__title')}>
                <div className={cx('product__title-name')}>
                    <NavLink to={`/user/sanpham/${id}`} title={name}>
                        {name}
                    </NavLink>
                </div>
                <div className={cx('product__title-price')}>
                    <ul className={cx('price-list')}>
                        <li className={cx('price-item')}>{formatCurrency(priceNew || 0)}</li>
                        {/* <li className={cx('price-item')}>{numeral(priceNew || 0).format('0,0')}</li> */}
                        <li className={cx('price-item')}>{formatCurrency(priceOld || 0)}</li>
                    </ul>
                </div>
            </div>

            <div className={cx('item-title-add')}>
                <button className={cx('item-title-link')} onClick={handleBuyNow}>
                    Mua ngay
                </button>
            </div>
        </div>
    );
}

export default NewProduct;
