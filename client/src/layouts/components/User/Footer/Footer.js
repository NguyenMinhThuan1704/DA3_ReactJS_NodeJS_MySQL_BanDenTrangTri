/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './Footer.module.scss';
import { faFacebook, faInstagram, faPinterest, faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import img from '~/assets/img';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('grid', 'wide', 'row')}>
                <div className={cx('footer__wrapper')}>
                    <div className={cx('footer-left', 'col', 'l-6')}>
                        <p className={cx('title-contact')}>CÔNG TY TNHH TTNT HƯNG THÀNH</p>

                        <ul className={cx('footer-list')}>
                            <li>8 Tân Khai, Phường 4, Tân Bình, TP.HCM</li>
                            <li>
                                <a href="https://zalo.me/0938346493">
                                    <em></em>
                                </a>
                                <span style={{ fontSize: '16px' }}>
                                    <em></em>
                                </span>
                                <span style={{ fontSize: '16px' }}>
                                    <em>Hotline+Zalo 1:</em>
                                </span>{' '}
                                <a href="tel:0937309879" rel="noreferrer nofollow" target="_blank">
                                    {' '}
                                    0937 309 879
                                </a>
                            </li>
                            <li>
                                <span style={{ fontSize: '16px' }}>
                                    <em>Hotline+Zalo 2:</em>
                                </span>{' '}
                                <a href="http://zalo.me/0989475868"> 0989 475 868</a>
                            </li>
                            <li>
                                <span style={{ fontSize: '16px' }}>
                                    <em>Hotline+Zalo 3:</em>
                                </span>{' '}
                                <a href="http://zalo.me/0909266116"> 0909 266 116</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <a href="mailto:thuanpro9b@gmail.com">thuanpro9b@gmail.com</a>
                            </li>
                            <li>
                                <i>MST</i>0311977849
                            </li>
                            <li>
                                <strong>Ngày thành lập:</strong> 22/09/2012
                            </li>
                            <li>
                                <strong>Nơi đăng ký:</strong> Sở Kế hoạch &amp; đầu tư Hồ Chí Minh
                            </li>
                            <li>
                                <strong>Người chịu trách nhiệm quản lý nội dung: </strong>Hồ Xuân Hưng
                            </li>
                        </ul>
                    </div>

                    <div className={cx('footer-right', 'col', 'l-6')}>
                        <div className={cx('title-contact')}>HỖ TRỢ KHÁCH HÀNG</div>

                        <ul className={cx('ul-footer')}>
                            <li>
                                <h6 className={cx('title_h6')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <a href="#" title="Bảo hành">
                                        Bảo hành
                                    </a>
                                </h6>
                            </li>
                            <li>
                                <h6 className={cx('title_h6')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <a href="#" title="Quy định và hình thức thanh toán">
                                        Quy định và hình thức thanh toán
                                    </a>
                                </h6>
                            </li>
                            <li>
                                <h6 className={cx('title_h6')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <a href="#" title="Vận chuyển giao nhận">
                                        Vận chuyển giao nhận
                                    </a>
                                </h6>
                            </li>
                            <li>
                                <h6 className={cx('title_h6')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <a href="#" title="Đổi trả hàng và hoàn tiền">
                                        Đổi trả hàng và hoàn tiền
                                    </a>
                                </h6>
                            </li>
                            <li>
                                <h6 className={cx('title_h6')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <a href="#" title="Bảo mật thông tin">
                                        Bảo mật thông tin
                                    </a>
                                </h6>
                            </li>
                        </ul>

                        <div className={cx('title-contact')}>Liên kết mạng xã hội</div>

                        <div className={cx('sharefooter')}>
                            <a
                                className={cx('itemshare')}
                                href="https://www.facebook.com/DenTrangTri.TheGioiAnhSang"
                                title="facebook"
                            >
                                <FontAwesomeIcon className="faFacebook" icon={faFacebook} />
                            </a>
                            <a
                                className={cx('itemshare')}
                                href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=24104"
                                title="instagram"
                            >
                                <FontAwesomeIcon className="faInstagram" icon={faInstagram} />
                            </a>
                            <a
                                className={cx('itemshare')}
                                href="https://www.youtube.com/channel/UChbLojWQp7lRgwkGUkI0fyQ?view_as=subscriber"
                                title="youtube"
                            >
                                <FontAwesomeIcon className="faYoutube" icon={faYoutube} />
                            </a>
                            <a className={cx('itemshare')} href="/" title="twitter">
                                <FontAwesomeIcon className="faTwitch" icon={faTwitch} />
                            </a>
                            <a className={cx('itemshare')} href="/" title="pinterest">
                                <FontAwesomeIcon className="faPinterest" icon={faPinterest} />
                            </a>
                        </div>

                        <div className={cx('footer-img')}>
                            <img src={img.footer.img} alt="" />
                            <img src={img.footer.img2} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('copyright')}>
                <span className={cx('text-ffbe00')}>
                    Bản Quyền @ 2021 Thế Giới Ánh Sáng - Thế giới đèn trang trí nội ngoại thất cao cấp
                </span>
            </div>
        </div>
    );
}

export default Footer;
