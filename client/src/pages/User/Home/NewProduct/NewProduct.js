/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './NewProduct.module.scss';
import { NavLink } from 'react-router-dom';
// import numeral from 'numeral';

const cx = classNames.bind(styles);

function NewProduct({ id, img, name, priceOld, priceNew, sale }) {
    const formatCurrency = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    return (
        <div className={cx('new__product-item', 'col', 'l-3', 'm-4', 'c-6')}>
            <div className={cx('new__product-img-wrapper')}>
                <NavLink to={`/user/sanpham/${id}`}>
                    <img src={img} alt={name} className={cx('new__product-img')} />
                </NavLink>
            </div>

            <div className={cx('sale-hot')}>
                <span>{sale}%</span>
            </div>

            <div className={cx('product__title')}>
                <div className={cx('product__title-name')}>
                    <a href="#" title={name}>
                        {name}
                    </a>
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
                <a href="#" className={cx('item-title-link')}>
                    Mua ngay
                </a>
            </div>
        </div>
    );
}

export default NewProduct;
