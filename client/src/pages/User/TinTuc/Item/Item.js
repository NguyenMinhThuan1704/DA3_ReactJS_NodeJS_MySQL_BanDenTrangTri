/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Item({ img, title, date, description }) {
    return (
        <div className={cx('new__product-item', 'col', 'l-4', 'm-4', 'c-6')}>
            <div className={cx('new__product-img-wrapper')}>
                <a style={{ width: '100%' }}>
                    <img src={img} alt="" className={cx('new__product-img')} />
                </a>
            </div>

            <h4 className={cx('title-h4')}>
                <a title={title}>{title}</a>
            </h4>

            <div className={cx('calendar')}>
                <FontAwesomeIcon className={cx('date')} icon={faCalendar} />
                {date}
            </div>

            <div className={cx('product__title')}>
                <div className={cx('product__title-name')}>
                    <a>{description}</a>
                </div>
            </div>
        </div>
    );
}

export default Item;
