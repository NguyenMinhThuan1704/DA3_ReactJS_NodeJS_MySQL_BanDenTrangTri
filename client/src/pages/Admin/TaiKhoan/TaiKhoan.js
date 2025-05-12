/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import taikhoanService from '../../../services/taikhoanService';
import loaitaikhoanService from '../../../services/loaitaikhoanService';
import CreateAndUpdateTK from './CreateAndUpdateTK';
import Delete from './Delete';
import Pagination from '../../../components/Pagination/Pagination';
import Search from '../../../components/Search/Search';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TaiKhoan.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faBarcode } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TaiKhoan() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(false);
    const [isShowDelete, setIsShowDelete] = useState(false);
    const [id, setID] = useState(0);
    const [searchParams] = useSearchParams();
    const [taikhoans, setTaiKhoans] = useState({ rows: [], count: 0 });
    const [loaitaikhoans, setLoaiTaiKhoans] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleOKDelete = () => {
        taikhoanService
            .deleteTaiKhoan(id)
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
                fetchData();
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
                taikhoanService.searchTaiKhoan({ page, value: searchValue }),
                loaitaikhoanService.getLoaiTaiKhoanAll(),
            ])
                .then(([taikhoanRes, loaitaikhoanRes]) => {
                    const taikhoans = taikhoanRes.data.data.rows;
                    const loaitaikhoans = loaitaikhoanRes.data.data.rows;

                    const mergedData = taikhoans.map((tk) => {
                        const loaiTK = loaitaikhoans.find((ltk) => ltk.id === tk.MaLoaiTK);
                        return {
                            ...tk,
                            LoaiTaiKhoan: loaiTK ? loaiTK.TenLoaiTK : 'Unknown',
                        };
                    });
                    setTaiKhoans({ rows: mergedData, count: taikhoanRes.data.data.count });
                    setLoaiTaiKhoans(loaitaikhoans);
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchParams, show, isShowDelete, searchValue]);

    const handleSave = (data, type) => {
        const savePromise =
            type === 'create' ? taikhoanService.createTaiKhoan(data) : taikhoanService.updateTaiKhoan(data, data.id);

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
                        <FontAwesomeIcon icon={faBarcode} />
                        Danh sách tài khoản
                    </div>
                    <form>
                        <div className={cx('row')}>
                            <div className={cx('col-4', 'col-s-12', 'padding-box')}>
                                <Search value={searchValue} onChange={handleSearchChange} />
                            </div>
                            {/* <div className={cx('col-6', 'col-s-12', 'padding-box')}>
                                <select name="MaLoaiTK">
                                    <option value="">--Chọn loại tài khoản--</option>
                                    {loaitaikhoans.map((loai) => (
                                        <option key={loai.MaLoaiTK} value={loai.MaLoaiTK}>
                                            {loai.TenLoaiTK}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('col-2', 'col-s-12', 'padding-box')}>
                                <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} /> Tìm kiếm
                                </button>
                            </div> */}
                        </div>
                    </form>
                    {/* <button
                        className={cx('btn-form', 'submit')}
                        style={{ backgroundColor: 'rgba(44, 140, 15, 0.8)', marginLeft: '8px' }}
                        onClick={handleShow}
                    >
                        Thêm tài khoản
                    </button> */}
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <table className="myTable">
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th>Mã tài khoản</th>
                                        <th>Loại tài khoản</th>
                                        <th>Tên tài khoản</th>
                                        {/* <th>Mật khẩu</th> */}
                                        <th>Email</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày chỉnh sửa</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taikhoans.rows.length > 0 ? (
                                        taikhoans.rows.map((item) => (
                                            <tr key={item.id} style={{ textAlign: 'center' }}>
                                                <td>{item.id}</td>
                                                <td>{item.LoaiTaiKhoan}</td>
                                                <td>{item.TaiKhoan}</td>
                                                {/* <td>{item.MatKhau}</td> */}
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
                                            <td colSpan="8" style={{ textAlign: 'center' }}>
                                                Không có tài khoản nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <div className={cx('box-sum')}>
                                <div className={cx('box-right')}>
                                    <Pagination total={taikhoans.count} pageSize={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateAndUpdateTK dataRaw={data} isShow={show} onSave={handleSave} onClose={handleClose} />
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

export default TaiKhoan;
