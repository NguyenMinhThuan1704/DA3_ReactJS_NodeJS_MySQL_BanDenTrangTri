/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './KhuyenMai.module.scss';

const cx = classNames.bind(styles);

function KhuyenMai() {
    return (
        <div className={cx('container', 'grid', 'wide')}>
            <div className={cx('new_title')}>
                <ul className={cx('breadcrumb', 'title-h2')}>
                    <li className={cx('breadcrumb-item')}>
                        <a title="Trang chủ">Trang chủ</a>
                    </li>
                    <li className={cx('breadcrumb-item')}>
                        <h2>Khuyến mãi</h2>
                    </li>
                </ul>
            </div>

            <div className={cx('content', 'row')}>
                <div className={cx('col', 'c-12')}>
                    <article className={cx('content_text')}>
                        <h2 style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '26px', color: '#ff0000' }}>
                                <span>
                                    <var>
                                        <strong>ĐÈN TRANG TRÍ KHUYẾN MÃI</strong>
                                    </var>
                                </span>
                            </span>
                        </h2>

                        <p style={{ display: 'none' }}>&nbsp;</p>

                        <h2>&nbsp;</h2>

                        <h2>1. Khuyến mãi đèn trang trí Châu Âu</h2>

                        <p>&nbsp;</p>

                        <h2>2. Khuyến mãi đèn trang trí nhập khẩu - Hàng mới 100%</h2>

                        <p>&nbsp;</p>

                        <h2>3. Khuyến mãi đèn trang trí trưng bày</h2>

                        <p>&nbsp;</p>

                        <p style={{ fontSize: '24px' }}>
                            <span>
                                <span style={{ color: '#0000cd' }}>Xem chi tiết tại đây:</span>
                                <a href="https://thegioianhsang.vn/den-khuyen-mai" style={{ color: '#44b362' }}>
                                    https://thegioianhsang.vn/den-khuyen-mai
                                </a>
                            </span>
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default KhuyenMai;
