/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './GioiThieu.module.scss';

const cx = classNames.bind(styles);

function GioiTHieu() {
    return (
        <div className={cx('container', 'grid', 'wide')}>
            <div className={cx('new_title')}>
                <ul className={cx('breadcrumb', 'title-h2')}>
                    <li className={cx('breadcrumb-item')}>
                        <a title="Trang chủ">Trang chủ</a>
                    </li>
                    <li className={cx('breadcrumb-item')}>
                        <h2>Giới thiệu</h2>
                    </li>
                </ul>
            </div>

            <div className={cx('content', 'row')}>
                <div className={cx('col', 'c-12')}>
                    <article className={cx('content__text')}>
                        <h2>
                            <span style={{ fontSize: '18px' }}>Chào mừng Quý khách đến với Thế Giới Ánh Sáng!</span>
                        </h2>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                Trang website thương mại điện tử đèn trang trí <a>https://thegioianhsang.vn</a> thuộc
                                quyền sở hữu của Công ty TNHH Trang trí nội thất Hưng Thành được thành lập vào ngày
                                22/09/2012 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp phép hoạt động.
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>Với tiêu chí&nbsp;</span>
                            <span style={{ fontSize: '14px' }}>
                                làm thỏa mãn nhu cầu hoàn thiện giá trị thẩm mỹ cho các công trình kiến trúc, xây dựng
                            </span>
                            <span style={{ fontSize: '14px' }}>
                                , chúng tôi đặt tính chuyên nghiệp, sự uy tín, tận tâm lên hàng đầu để phục vụ khách
                                hàng.
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                Với kiến thức về kỹ thuật và sự am tường nghệ thuật trang trí, chúng tôi sẽ tập trung tư
                                vấn cho Quý khách hàng dễ dàng chọn lựa được các sản phẩm đèn trang trí phù hợp và hoàn
                                hảo nhất cho không gian sống của khách hàng từ cao cấp đến bình dân.
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                Chúng tôi cam kết mang đến cho Quý khách hàng những sản phẩm có chất lượng tốt nhất,
                                hiện đại nhất bằng chính sự trân trọng, niềm tin và trách nhiệm của mình với kim chỉ nam
                                hành động&nbsp;
                            </span>
                            <span style={{ fontSize: '14px' }}>Kinh doanh gắn liền với Uy tín, Chất lượng</span>
                            <span style={{ fontSize: '14px' }}>.</span>
                        </p>

                        <p>
                            <strong>
                                <span style={{ fontSize: '14px' }}>
                                    Thế Giới Ánh Sáng hận hạnh được phục vụ Quý khách!
                                </span>
                            </strong>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                <span>
                                    <b>Văn phòng công ty:</b>
                                    <br />
                                    Đ/c: 8 Tân Khai, phường 4, Q. Tân Bình, Tp.HCM
                                    <br />
                                    Điện thoại: (028) 1234 5678 - (028) 8765 4321
                                    <br />
                                    Hotline:{' '}
                                    <a href="tel:0123456789" rel="noreferrer nofollow" target="_blank">
                                        0123 456 879 <span>( Ms. Thuận)</span>
                                    </a>{' '}
                                    - <a href="http://zalo.me/0123456789">0989 475 868&nbsp;(Ms. Hoàng Anh)</a>
                                    <br />
                                    Email: <a href="mailto:minhthuan@thegioianhsang.vn">minhthuan@thegioianhsang.vn</a>
                                    <br />
                                    Website: <a>https://thegioianhsang.vn</a>
                                </span>
                            </span>
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default GioiTHieu;
