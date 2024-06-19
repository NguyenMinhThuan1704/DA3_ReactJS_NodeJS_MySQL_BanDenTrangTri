/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TongQuan.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faCloud, faSignal, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import sanphamService from '../../../services/sanphamService';
import numeral from 'numeral';

const cx = classNames.bind(styles);

function TongQuan() {
    const [selectedOption, setSelectedOption] = useState('tuan');
    const [procDay, setListTKe] = useState(null);
    const [listTKe_week, setListTKeWeek] = useState(null);
    const [listTKe_month, setListTKeMonth] = useState(null);
    const [listTKe_year, setListTKeYear] = useState(null);
    const [listSPNew, setListSPNew] = useState(null);
    const [listTopSP, setListTopSP] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseDay = await sanphamService.getProcDay();
                const responseWeek = await sanphamService.getProcWeek();
                const responseMonth = await sanphamService.getProcMonth();
                const responseYear = await sanphamService.getProcYear();
                const responseSPNew = await sanphamService.postTKSP({ ChucNang: 4 });
                const responseTopSP = await sanphamService.postTKSP({ ChucNang: 1 });

                setListTKe(responseDay.data.data[0]);
                setListTKeWeek(responseWeek.data.data[0]);
                setListTKeMonth(responseMonth.data.data[0]);
                setListTKeYear(responseYear.data.data[0]);
                setListSPNew(responseSPNew.data.data);
                setListTopSP(responseTopSP.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChangeOption = (option) => {
        setSelectedOption(option);
    };

    const renderThongKe = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        const formatNumber = (number) => (number ? numeral(number).format('0,0') : 'Loading...');

        switch (selectedOption) {
            case 'tuan':
                return (
                    <>
                        <div className={cx('money_week', 'week1')}>
                            <FontAwesomeIcon icon={faSignal} className={cx('icon-info')} />
                            <span>
                                Doanh thu tuần
                                <br />
                                <span>{formatNumber(listTKe_week?.DoanhThu)} VNĐ</span>
                            </span>
                        </div>
                        <div className={cx('product_week', 'week1')}>
                            <FontAwesomeIcon icon={faCloud} className={cx('icon-info')} />
                            <div style={{ display: 'grid' }}>
                                <span>Đơn hàng bán: {listTKe_week?.SoDonHangBan || 'Loading...'}</span>
                                <span>
                                    Sản phẩm bán: <span>{listTKe_week?.SoSanPhamBan || 'Loading...'}</span>
                                </span>
                            </div>
                        </div>
                        <div className={cx('return_week', 'week1')}>
                            <FontAwesomeIcon icon={faUndoAlt} className={cx('icon-info')} />
                            <div style={{ display: 'grid' }}>
                                <span>Số đơn hàng nhập: {listTKe_week?.SoDonHangNhap || 'Loading...'}</span>
                                <span>Số sản phẩm mới nhập: {listTKe_week?.SoSanPhamNhap || 'Loading...'}</span>
                            </div>
                        </div>
                    </>
                );
            case 'thang':
                return (
                    <>
                        <div className={cx('money_week', 'week1')}>
                            <FontAwesomeIcon icon={faSignal} className={cx('icon-info')} />
                            <span>
                                Doanh thu tháng
                                <br />
                                <span>{formatNumber(listTKe_month?.DoanhThu)} VNĐ</span>
                            </span>
                        </div>
                        <div className={cx('product_week', 'week1')}>
                            <FontAwesomeIcon icon={faCloud} className={cx('icon-info')} />
                            <div style={{ display: 'grid' }}>
                                <span>Đơn hàng bán: {listTKe_month?.SoDonHangBan || 'Loading...'}</span>
                                <span>
                                    Sản phẩm bán: <span>{listTKe_month?.SoSanPhamBan || 'Loading...'}</span>
                                </span>
                            </div>
                        </div>
                        <div className={cx('return_week', 'week1')}>
                            <FontAwesomeIcon icon={faUndoAlt} className={cx('icon-info')} />
                            <div style={{ display: 'grid' }}>
                                <span>Số đơn hàng nhập: {listTKe_month?.SoDonHangNhap || 'Loading...'}</span>
                                <span>Số sản phẩm mới nhập: {listTKe_month?.SoSanPhamNhap || 'Loading...'}</span>
                            </div>
                        </div>
                    </>
                );
            case 'nam':
                return (
                    <>
                        <div className={cx('money_week', 'week1')}>
                            <FontAwesomeIcon icon={faSignal} className={cx('icon-info')} />
                            <span>
                                Doanh thu năm
                                <br />
                                <span>{formatNumber(listTKe_year?.DoanhThu)} VNĐ</span>
                            </span>
                        </div>
                        <div className={cx('product_week', 'week1')}>
                            <FontAwesomeIcon icon={faCloud} className={cx('icon-info')} />
                            <div style={{ display: 'grid' }}>
                                <span>Đơn hàng bán: {listTKe_year?.SoDonHangBan || 'Loading...'}</span>
                                <span>
                                    Sản phẩm bán: <span>{listTKe_year?.SoSanPhamBan || 'Loading...'}</span>
                                </span>
                            </div>
                        </div>
                        <div className={cx('return_week', 'week1')}>
                            <FontAwesomeIcon icon={faUndoAlt} className={cx('icon-info')} />
                            <div style={{ display: 'grid' }}>
                                <span>Số đơn hàng nhập: {listTKe_year?.SoDonHangNhap || 'Loading...'}</span>
                                <span>Số sản phẩm mới nhập: {listTKe_year?.SoSanPhamNhap || 'Loading...'}</span>
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('col-12', 'col-s-12', 'col-m-12', 'Details')}>
            <div className={cx('overview', 'Page')}>
                <div className={cx('overview1')}>
                    <span className={cx('col-12', 'col-s-12', 'col-m-12')}>KẾT QUẢ KINH DOANH TRONG NGÀY</span>
                    <div className={cx('tabcontent')}>
                        <div className={cx('row')}>
                            <div className={cx('col-4', 'col-s-12', 'padding-box')}>
                                <div className={cx('box')} style={{ backgroundColor: '#9abc32' }}>
                                    <div className={cx('box-left')}>
                                        <FontAwesomeIcon icon={faSignal} />
                                    </div>
                                    <div style={{ display: 'grid' }}>
                                        <div className={cx('box-right')}>Doanh thu trong ngày:</div>
                                        <div>{numeral(procDay?.DoanhThu).format('0,0') || 'Loading...'} VNĐ</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-4', 'col-s-12', 'padding-box')}>
                                <div className={cx('box')} style={{ backgroundColor: '#6FB3E0' }}>
                                    <div className={cx('box-left')}>
                                        <FontAwesomeIcon icon={faCloud} />
                                    </div>
                                    <div className={cx('box-right')}>
                                        Số đơn hàng bán: <span>{procDay?.SoDonHangBan || 'Loading...'}</span>
                                    </div>
                                    <div className={cx('box-right')}>
                                        Số sản phẩm bán: <span>{procDay?.SoSanPhamBan || 'Loading...'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-4', 'col-s-12', 'padding-box')}>
                                <div className={cx('box')} style={{ backgroundColor: '#D53F' }}>
                                    <div className={cx('box-left')}>
                                        <FontAwesomeIcon icon={faUndoAlt} />
                                    </div>
                                    <div className={cx('box-right')}>
                                        Số đơn hàng nhập: <span>{procDay?.SoDonHangNhap || 'Loading...'}</span>
                                    </div>
                                    <div className={cx('box-right')}>
                                        Số sản phẩm mới nhập: <span>{procDay?.SoSanPhamNhap || 'Loading...'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('tabcontent')}>
                        <div className={cx('chooseover')}>
                            <label htmlFor="txt_over">Tổng quan về thống kê </label>
                            <select
                                onChange={(e) => handleChangeOption(e.target.value)}
                                id="txt_over"
                                style={{ outline: 'none' }}
                            >
                                <option value="tuan">Theo tuần</option>
                                <option value="thang">Theo tháng</option>
                                <option value="nam">Theo năm</option>
                            </select>
                        </div>
                        <div className={cx('sales')}>{renderThongKe()}</div>
                    </div>
                    <div className={cx('row', 'tabcontent')}>
                        <div className={cx('col-6', 'col-s-12')}>
                            <div className={cx('box2')}>
                                <div className={cx('box2-top')}>
                                    <FontAwesomeIcon icon={faBoxes} /> Sản phẩm bán chạy nhất
                                </div>
                                <div className={cx('box2-bot')}>
                                    {listTopSP.map((product) => (
                                        <div key={product.id} style={{ padding: 0, margin: '12px 0', display: 'flex' }}>
                                            <div className={cx('product__img')}>
                                                <a className={cx('product__img-link')}>
                                                    <img src={product.AnhDaiDien} alt="" className={cx('img')} />
                                                </a>
                                            </div>
                                            <div className={cx('col', 'c-10', 'product__thongtin')}>
                                                <div className={cx('name-cart')}>
                                                    <span>{product.TenSanPham}</span>
                                                </div>
                                                <div>
                                                    <span>
                                                        Mã sản phẩm: {product.id}
                                                        <b></b>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-6', 'col-s-12')}>
                            <div className={cx('box2')}>
                                <div className={cx('box2-top')}>
                                    <FontAwesomeIcon icon={faBoxes} /> Sản phẩm mới nhất
                                </div>
                                <div className={cx('box2-bot')}>
                                    {listSPNew.map((product) => (
                                        <div key={product.id} style={{ padding: 0, margin: '12px 0', display: 'flex' }}>
                                            <div className={cx('product__img')}>
                                                <a className={cx('product__img-link')}>
                                                    <img src={product.AnhDaiDien} alt="" className={cx('img')} />
                                                </a>
                                            </div>
                                            <div className={cx('col', 'c-10', 'product__thongtin')}>
                                                <div className={cx('name-cart')}>
                                                    <span>{product.TenSanPham}</span>
                                                </div>
                                                <div>
                                                    <span>
                                                        Mã sản phẩm: {product.id}
                                                        <b></b>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TongQuan;
