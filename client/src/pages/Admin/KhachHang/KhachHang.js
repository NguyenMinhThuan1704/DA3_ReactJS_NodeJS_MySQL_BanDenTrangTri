import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import khachhangService from '../../../services/khachhangService';
import taikhoanService from '../../../services/taikhoanService';
import CreateAndUpdateKH from './CreateAndUpdateKH';
import Delete from './Delete';
import Pagination from '../../../components/Pagination/Pagination'; /* eslint-disable jsx-a11y/anchor-is-valid */
import Search from '../../../components/Search/Search';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './KhachHang.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function KhachHang() {
    const [show, setShow] = useState(false);

    const [data, setData] = useState(false);

    const [isShowDelete, setIsShowDelete] = useState(false);

    const [id, setID] = useState(0);

    const [searchParams] = useSearchParams();

    const [khachhangs, setKhachHangs] = useState({ rows: [], count: 0 });

    // eslint-disable-next-line no-unused-vars
    const [taikhoans, setTaiKhoans] = useState([]);

    const [searchValue, setSearchValue] = useState('');

    const handleOKDelete = () => {
        khachhangService
            .deleteKhachHang(id)
            .then(() => {
                setID(0);
                setIsShowDelete(false);
                toast.success('Xóa thành công!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                fetchData(); // Re-fetch data after deletion
            })
            .catch((err) => console.error(err));
    };

    const handleShow = () => {
        setData(undefined);
        setShow(true);
    };
    const handleEdit = (item) => {
        setData(item);
        setShow(true);
    };
    const handleDelete = (itemID) => {
        setID(itemID);
        setIsShowDelete(true);
    };
    const handleClose = () => {
        setShow(false);
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchValue(value);
    };

    const fetchData = () => {
        if (Number(searchParams.get('page')) > 0 && !(show || isShowDelete)) {
            const page = Number(searchParams.get('page'));
            Promise.all([
                khachhangService.searchKhachHang({ page, value: searchValue }),
                taikhoanService.getTaiKhoan({ page }),
            ])
                .then(([khachhangRes, taikhoanRes]) => {
                    const khachangs = khachhangRes.data.data.rows;
                    const taikhoans = taikhoanRes.data.data.rows;

                    const mergedData = khachangs.map((kh) => {
                        const taiKhoan = taikhoans.find((tk) => tk.id === kh.MaTaiKhoan);
                        return {
                            ...kh,
                            TaiKhoan: taiKhoan ? taiKhoan.TaiKhoan : 'Unknown',
                        };
                    });

                    setKhachHangs({ rows: mergedData, count: khachhangRes.data.data.count });
                    setTaiKhoans(taikhoans);
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, show, isShowDelete, searchValue]);

    const handleSave = (data, type) => {
        const savePromise =
            type === 'create'
                ? khachhangService.createKhachHang(data)
                : khachhangService.updateKhachHang(data, data.id);

        savePromise
            .then(() => {
                toast.success(`${type === 'create' ? 'Tạo' : 'Sửa'} thành công!`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setShow(false);
                fetchData(); // Re-fetch data after save
            })
            .catch((err) => console.error(err));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={cx('col-12', 'col-s-12', 'content')}>
            <div className={cx('col-12', 'col-s-12', 'content')}>
                <div className={cx('tabcontent')}>
                    <div className={cx('title')}>
                        <FontAwesomeIcon icon={faUsers} />
                        Danh sách khách hàng
                    </div>
                    <div className={cx('row')} style={{ display: 'inherit' }}>
                        <form>
                            <div className={cx('col-5', 'col-s-12', 'padding-box')}>
                                <Search value={searchValue} onChange={handleSearchChange} />
                            </div>
                        </form>
                    </div>
                    <a className="">
                        <button
                            className={cx('btn-form', 'submit')}
                            style={{ backgroundColor: 'rgba(44, 140, 15, 0.8)', marginLeft: '8px' }}
                            onClick={handleShow}
                        >
                            Thêm khách hàng
                        </button>
                    </a>
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <table className="myTable">
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th>Mã khách hàng</th>
                                        <th>Tài khoản</th>
                                        <th>Tên khách hàng</th>
                                        <th>Địa chỉ</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày chỉnh sửa</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {khachhangs.rows.length > 0 ? (
                                        khachhangs.rows.map((item) => (
                                            <tr style={{ textAlign: 'center' }}>
                                                <td>{item.id}</td>
                                                <td>{item.TaiKhoan}</td>
                                                <td>{item.TenKH}</td>
                                                <td>{item.DiaChi}</td>
                                                <td>{item.SoDienThoai}</td>
                                                <td>{item.Email}</td>
                                                <td>{formatDate(item.createdAt)}</td>
                                                <td>{formatDate(item.updatedAt)}</td>
                                                <td>
                                                    <button onClick={() => handleEdit(item)}>
                                                        <FontAwesomeIcon icon={faEdit} title="Sửa" />
                                                    </button>
                                                    <button onClick={() => handleDelete(item.id)}>
                                                        <FontAwesomeIcon icon={faTrash} title="Xóa" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center' }}>
                                                Không có khách hàng nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <div className={cx('box-sum')}>
                                <div className={cx('box-right')}>
                                    <Pagination total={khachhangs.count} pageSize={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateAndUpdateKH dataRaw={data} isShow={show} onSave={handleSave} onClose={handleClose} />
            <Delete isShow={isShowDelete} onOk={handleOKDelete} onClose={() => setIsShowDelete(false)} />
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

export default KhachHang;
