/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './HoaDonBan.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '../../../components/Pagination/Pagination';
import hoadonbanService from '../../../services/hoadonbanService';
import DetailHDB from './DetailHDB';
import Search from '../../../components/Search/Search';
import numeral from 'numeral';

const cx = classNames.bind(styles);

function HoaDonBan() {
    const [show, setShow] = useState(false);

    const [reload, setReload] = useState(false);

    const [data, setData] = useState(false);

    const [hoadonbans, setHoaDonBans] = useState({ rows: [], count: 0 });

    const [searchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState('');

    const handleDetail = (item) => {
        setData(item);
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };

    const fetchHoaDonBans = () => {
        const page = Number(searchParams.get('page'));
        if (page > 0) {
            // hoadonbanService.getHoaDonBan({ page }).then((res) => {
            //     setHoaDonBans(res.data.data);
            // });
            hoadonbanService
                .searchHoaDonBan({ page: Number(searchParams.get('page')), value: searchValue })
                .then((res) => {
                    setHoaDonBans(res.data.data);
                });
        }
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchValue(value);
    };

    useEffect(() => {
        fetchHoaDonBans();
    }, [searchParams, reload, searchValue]);

    // const formatDate = (dateString) => {
    //     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    //     return new Date(dateString).toLocaleDateString(undefined, options);
    // };

    const handleStatusChange = (id, currentStatus) => {
        const confirmationMessage = currentStatus
            ? 'Bạn có chắc muốn hủy duyệt đơn hàng này?'
            : 'Bạn có chắc muốn duyệt đơn hàng này?';
        if (window.confirm(confirmationMessage)) {
            const newStatus = currentStatus ? 0 : 1;
            const newTrangThai = newStatus === 1 ? 'Đã duyệt, chờ vận chuyển' : 'Chưa duyệt';

            hoadonbanService
                .updateHoaDonBan({ TrangThaiDuyet: newStatus, TrangThai: newTrangThai }, id)
                .then(() => {
                    toast.success('Cập nhật duyệt thành công!');
                    setHoaDonBans((prev) => ({
                        ...prev,
                        rows: prev.rows.map((x) =>
                            x.id === id ? { ...x, TrangThaiDuyet: newStatus, TrangThai: newTrangThai } : x,
                        ),
                    }));
                    setReload((r) => !r);
                })
                .catch(() => toast.error('Cập nhật thất bại'));
        }
    };

    const getOrderStatus = (item) => {
        if (item.TrangThai === 'Hoàn thành') {
            return 'Hoàn thành';
        }
        if (!item.TrangThaiDuyet) {
            return 'Chưa duyệt';
        }
        if (!item.Shipped) {
            return 'Đã duyệt, chờ vận chuyển';
        }
        return 'Đơn hàng đang trên đường giao';
    };

    const handleShippedChange = (id, currentShipped, currentStatus) => {
        if (!currentStatus) {
            window.alert('Bạn phải duyệt đơn hàng trước khi vận chuyển.');
            return;
        }
        const confirmationMessage = currentShipped
            ? 'Bạn có chắc muốn hủy vận chuyển đơn hàng này?'
            : 'Bạn có chắc muốn vận chuyển đơn hàng này?';
        if (window.confirm(confirmationMessage)) {
            const newShipped = currentShipped ? 0 : 1;
            const updateData =
                newShipped === 1
                    ? { Shipped: newShipped, TrangThai: 'Đơn hàng đang trên đường giao' }
                    : { Shipped: newShipped, TrangThai: 'Đã duyệt, chờ vận chuyển' };
            hoadonbanService
                .updateHoaDonBan(updateData, id)
                .then(() => {
                    toast.success('Cập nhật vận chuyển thành công!');
                    setHoaDonBans((prev) => ({
                        ...prev,
                        rows: prev.rows.map((x) =>
                            x.id === id
                                ? {
                                      ...x,
                                      Shipped: newShipped,
                                      ...(newShipped === 1 ? { TrangThai: 'Đơn hàng đang trên đường giao' } : {}),
                                  }
                                : x,
                        ),
                    }));
                    setReload((r) => !r);
                })
                .catch(() => toast.error('Cập nhật thất bại'));
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const HH = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
    };

    return (
        <div className={cx('col-12', 'col-s-12', 'content')}>
            <div className={cx('col-12', 'col-s-12', 'content')}>
                <div className={cx('tabcontent')}>
                    <div className={cx('title')}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        Danh sách hóa đơn bán
                    </div>
                    <div className={cx('row')} style={{ display: 'inherit' }}>
                        <form>
                            <div className={cx('col-5', 'col-s-12', 'padding-box')}>
                                <Search value={searchValue} onChange={handleSearchChange} />
                            </div>
                        </form>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <table className="myTable">
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        {/* <th>STT</th> */}
                                        <th>Thời gian tạo</th>
                                        <th>Tên khách hàng</th>
                                        <th>Địa chỉ</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái duyệt</th>
                                        <th>Vận chuyển</th>
                                        <th>Thanh Toán</th>
                                        <th>Trạng thái đơn hàng</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hoadonbans.rows.length > 0 ? (
                                        hoadonbans.rows.map((item, index) => (
                                            <tr style={{ textAlign: 'center' }} key={item.id}>
                                                {/* <td>
                                                    {((Number(searchParams.get('page')) || 1) - 1) * 10 + index + 1}
                                                </td> */}
                                                <td>{formatDateTime(item.createdAt)}</td>
                                                <td>{item.TenKH}</td>
                                                <td>{item.DiaChi}</td>
                                                <td>{item.SoDienThoai}</td>
                                                <td>{item.Email}</td>
                                                <td>{numeral(item.TongGia).format('0,0')}</td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.TrangThaiDuyet}
                                                        onChange={() =>
                                                            handleStatusChange(item.id, item.TrangThaiDuyet)
                                                        }
                                                        disabled={item.TrangThai === 'Hoàn thành'}
                                                    />
                                                    <div>{item.TrangThaiDuyet ? 'Đã duyệt' : 'Chưa duyệt'}</div>
                                                </td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.Shipped}
                                                        onChange={() =>
                                                            handleShippedChange(
                                                                item.id,
                                                                item.Shipped,
                                                                item.TrangThaiDuyet,
                                                            )
                                                        }
                                                        disabled={item.TrangThai === 'Hoàn thành'}
                                                    />
                                                    <div>{item.Shipped ? 'Đã vận chuyển' : 'Chưa vận chuyển'}</div>
                                                </td>
                                                <td>{item.TrangThaiThanhToan ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                                                <td>{getOrderStatus(item)}</td>

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
                                    <Pagination total={hoadonbans.count} pageSize={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DetailHDB dataRaw={data} isShow={show} onClose={handleClose} />
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

export default HoaDonBan;
