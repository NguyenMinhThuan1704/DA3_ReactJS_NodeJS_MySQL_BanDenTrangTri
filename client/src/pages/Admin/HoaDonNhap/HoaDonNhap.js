/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import styles from './HoaDonNhap.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Pagination from '../../../components/Pagination/Pagination';
import hoadonnhapService from '../../../services/hoadonnhapService';
import nhaphanphoiService from '../../../services/nhaphanphoiService';
import taikhoanService from '../../../services/taikhoanService';
import CreateHDN from './CreateHDN';
import DetailHDN from './DetailHDN';
import numeral from 'numeral';

const cx = classNames.bind(styles);

function HoaDonNhap() {
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    const [data, setData] = useState(false);

    const [hoadonnhaps, setHoaDonNhaps] = useState({ rows: [], count: 0 });
    const totalCount = hoadonnhaps.length;

    const [searchParams] = useSearchParams();

    const handleShowCreate = () => {
        setData(undefined);
        setShowCreate(true);
    };

    const handleDetail = (item) => {
        setData(item);
        setShowDetail(true);
    };

    const handleCloseCreate = () => {
        setShowCreate(false);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
    };

    const fetchHoaDonBans = () => {
        const page = Number(searchParams.get('page'));
        if (page > 0) {
            hoadonnhapService.getHoaDonNhap({ page }).then((res) => {
                const hoaDonNhapData = res.data.data.rows;

                const promises = hoaDonNhapData.map((hdn) => {
                    const maTaiKhoan = hdn.MaTaiKhoan;
                    const maNhaPhanPhoi = hdn.MaNhaPhanPhoi;

                    const taiKhoanPromise = taikhoanService.getTaiKhoanById(maTaiKhoan);
                    const nhaPhanPhoiPromise = nhaphanphoiService.getNhaPhanPhoiById(maNhaPhanPhoi);

                    // Kết hợp thông tin từ hai API
                    return Promise.all([taiKhoanPromise, nhaPhanPhoiPromise]).then(([taiKhoanRes, nhaPhanPhoiRes]) => {
                        const taiKhoanData = taiKhoanRes.data.data;
                        const nhaPhanPhoiData = nhaPhanPhoiRes.data.data;

                        return {
                            ...taiKhoanData,
                            ...nhaPhanPhoiData,
                            ...hdn,
                        };
                    });
                });

                // Khi tất cả các Promise đã được giải quyết, cập nhật hoaDonNhaps với dữ liệu mới
                Promise.all(promises).then((updatedHoaDonNhapData) => {
                    setHoaDonNhaps(updatedHoaDonNhapData);
                });
            });
        }
    };

    useEffect(() => {
        fetchHoaDonBans();
    }, [searchParams, showCreate, showDetail]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={cx('col-12', 'col-s-12', 'content')}>
            <div className={cx('col-12', 'col-s-12')}>
                <div className={cx('tabcontent')}>
                    <div className={cx('title')}>
                        <FontAwesomeIcon icon={faShoppingCart} /> Danh sách hóa đơn nhập
                        <hr />
                    </div>
                    <form>
                        <div className={cx('row')}>
                            <div className={cx('col-2', 'col-s-12', 'padding-box')}>
                                <input type="text" name="MaHoaDonNhap" placeholder="Nhập mã hóa đơn..." />
                            </div>
                            <div className={cx('col-4', 'col-s-12', 'padding-box')}>
                                <select name="MaNhaPhanPhoi">
                                    <option value="">--Chọn nhà phân phối--</option>
                                </select>
                            </div>
                            <div className={cx('col-4', 'col-s-12', 'padding-box')}>
                                <select name="id">
                                    <option value="">--Chọn nhân viên nhập--</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <button
                        className={cx('btn-form', 'submit')}
                        style={{ backgroundColor: 'rgba(44, 140, 15, 0.8)', marginLeft: '8px' }}
                        onClick={handleShowCreate}
                    >
                        Thêm hóa đơn nhập
                    </button>
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <table className="myTable">
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th>Mã hóa đơn nhập</th>
                                        <th>Nhà cung cấp</th>
                                        <th>Nhân viên nhập</th>
                                        <th>Kiểu thanh toán</th>
                                        <th>Tổng tiền</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày chỉnh sửa</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hoadonnhaps.length > 0 ? (
                                        hoadonnhaps.map((item) => (
                                            <tr style={{ textAlign: 'center' }} key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.TenNhaPhanPhoi}</td>
                                                <td>{item.TaiKhoan}</td>
                                                <td>{item.KieuThanhToan}</td>
                                                <td>{numeral(item.TongTien).format('0,0')}</td>
                                                <td>{formatDate(item.createdAt)}</td>
                                                <td>{formatDate(item.updatedAt)}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleDetail(item)}
                                                    >
                                                        <a style={{ color: 'white', padding: '6px 14px' }}>Detail</a>
                                                    </button>
                                                    {/* <a>
                                                        <FontAwesomeIcon icon={faTrash} title="Xóa" />
                                                    </a> */}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" style={{ textAlign: 'center' }}>
                                                Không có hóa đơn bán nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <div className={cx('box-sum')}>
                                <div className={cx('box-right')}>
                                    <Pagination total={totalCount} pageSize={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showCreate && <CreateHDN dataRaw={data} isShow={showCreate} onClose={handleCloseCreate} />}
            {showDetail && <DetailHDN dataRaw={data} isShow={showDetail} onClose={handleCloseDetail} />}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
            />
        </div>
    );
}

export default HoaDonNhap;
