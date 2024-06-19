/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './LienHe.module.scss';

const cx = classNames.bind(styles);

function LienHe() {
    return (
        <div className={cx('container', 'grid', 'wide')}>
            <div
                className={cx('row', 'grid', 'wide', 'wrapper')}
                style={{ justifyContent: 'space-between', margin: '30px 0' }}
            >
                <div className={cx('col', 'c-6')} style={{ backgroundColor: '#fff', height: 'auto' }}>
                    <div className={cx('content')}>
                        <div className={cx('title-text')}>
                            <span>Form liên hệ</span>
                        </div>
                    </div>

                    <div
                        className={cx('row', 'thongtin')}
                        style={{ display: 'flex', flexWrap: 'wrap', marginRight: '-15px', marginLeft: '-15px' }}
                    >
                        <div className={cx('c-12', 'thongtin_title')}>
                            <p>Họ và tên (*):</p>
                            <div className={cx('form-group')} id="input-name">
                                <input type="text" className={cx('form-control', 'name')} placeholder="Họ và tên (*)" />
                            </div>
                        </div>

                        <div className={cx('c-12', 'thongtin_title')}>
                            <p>Số điện thoại (*):</p>
                            <div className={cx('form-group')} id="input-phone">
                                <input
                                    className={cx('form-control', 'phone')}
                                    type="text"
                                    placeholder="Số điện thoại (*)"
                                />
                            </div>
                        </div>

                        <div className={cx('c-12', 'thongtin_title')}>
                            <p>Địa chỉ (*):</p>
                            <div className={cx('form-group')} id="input-address">
                                <input className={cx('form-control', 'address')} type="text" placeholder="Địa chỉ" />
                            </div>
                        </div>

                        <div className={cx('c-12', 'thongtin_title')}>
                            <p>Email:</p>
                            <div className={cx('form-group')} id="input-email">
                                <input className={cx('form-control', 'email')} type="text" placeholder="Email" />
                            </div>
                        </div>

                        <div className={cx('thongtin_title')}>
                            <p>Nội dung:</p>
                            <div className={cx('form-group')} id="input-email" style={{ height: 'auto !important' }}>
                                <textarea
                                    name="content"
                                    type="text"
                                    className={cx('form-control', 'form-group', 'form-controll', 'p-2')}
                                    id="content"
                                    rows="5"
                                ></textarea>
                            </div>
                        </div>

                        <button className={cx('btn__shopping--cart')}>
                            <i className={cx('fa-solid', 'fa-arrow-right')}></i>
                            Gửi liên hệ
                        </button>
                    </div>
                </div>

                <div className={cx('col', 'c-6')} style={{ backgroundColor: '#fff' }}>
                    <div className={cx('title-text')}>
                        <span>Thông tin liên hệ</span>
                    </div>

                    <div className={cx('col-contact', 'content-contact')}>
                        <p style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '30px' }}>
                                <span style={{ color: '#ff0000' }}>
                                    <strong>THẾ GIỚI ÁNH SÁNG</strong>
                                </span>
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                <strong>Văn phòng :&nbsp;</strong> 8 Tân Khai, P.4, Tân Bình, TP.HCM (Sau trường THPT
                                Nguyễn Thường Hiền)
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                <strong></strong>
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                <strong>Điện thoại :</strong> <a href="tel:(028) 1234 5678">(028) 1234 5678</a> -{' '}
                                <a href="tel:(028) 1234 5678">(028) 1234 5678</a>
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                <strong>Hotline+Zalo 1:</strong>{' '}
                                <a href="tel:0123456789" rel="noreferrer nofollow" target="_blank">
                                    0123 456 789 ( Ms. Thuận)
                                </a>
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                <strong>Hotline+Zalo 2:</strong>{' '}
                                <a href="http://zalo.me/0123456789">0123 456 789&nbsp;(Ms. Hoàng Anh)</a>
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                <strong>Email:</strong> minhthuan@thegioianhsang.vn
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                <strong>Website:</strong> <strong>www.thegioianhsang.vn</strong>
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                Với tiêu chí làm thỏa mãn nhu cầu hoàn thiện giá trị thẩm mỹ cho các công trình kiến
                                trúc, xây dựng , chúng tôi đặt tính chuyên nghiệp, sự uy tín, tận tâm lên hàng đầu để
                                phục vụ khách hàng.
                            </span>
                        </p>

                        <p>
                            <span style={{ fontSize: '14px' }}>
                                Chúng tôi cam kết mang đến cho Quý khách hàng những sản phẩm có chất lượng tốt nhất,
                                hiện đại nhất bằng chính sự trân trọng, niềm tin và trách nhiệm của mình với kim chỉ nam
                                hành động Kinh doanh gắn liền với Uy tín, Chất lượng .
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LienHe;
