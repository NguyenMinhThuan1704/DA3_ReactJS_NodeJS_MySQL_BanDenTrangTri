/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import styles from './LoaiSanPham.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import loaispService from '../../../services/loaispService';
import CreateAndUpdateLSP from './CreateAndUpdateLSP';
import Delete from './Delete';
import Pagination from '../../../components/Pagination/Pagination';
import Search from '../../../components/Search/Search';

const cx = classNames.bind(styles);

function LoaiSanPham() {
    const [show, setShow] = useState(false);

    const [data, setData] = useState(false);

    const [loaisps, setLoaiSPs] = useState({ rows: [], count: 0 });

    const [isShowDelete, setIsShowDelete] = useState(false);

    const [id, setID] = useState(0);

    const [searchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState('');

    const handleOKDelete = () => {
        loaispService.deleteCategory(id);
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

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0 && !(show || isShowDelete)) {
            loaispService.searchLoaiSP({ page: Number(searchParams.get('page')), value: searchValue }).then((res) => {
                setLoaiSPs(res.data.data);
            });
        }
    }, [searchParams, show, isShowDelete, searchValue]);

    const handleSave = (data, type) => {
        if (type === 'create') {
            loaispService
                .createCategory(data)
                .then((res) => {
                    toast.success('Tao thanh cong!', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    setShow(false);
                })
                .catch((err) => console.log(err));
        } else if (type === 'update') {
            loaispService
                .updateCategory(data, data.id)
                .then((res) => {
                    toast.success('Sua thanh cong!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    setShow(false);
                })
                .catch((err) => console.log(err));
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={cx('col-12', 'col-s-12', 'content')}>
            <div className={cx('col-12', 'col-s-12')}>
                <div className={cx('tabcontent')}>
                    <div className={cx('title')}>
                        <FontAwesomeIcon icon={faBoxes} />
                        Danh sách loại sản phẩm
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
                            Thêm loại sản phẩm
                        </button>
                    </a>
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <table className={cx('myTable')}>
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th>Mã loại sản phẩm</th>
                                        <th>Tên loại sản phẩm</th>
                                        <th>Nội dung</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày chỉnh sửa</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody" style={{ textAlign: 'center' }}>
                                    {loaisps.rows.length > 0 ? (
                                        loaisps?.rows.map((item) => (
                                            <tr style={{ textAlign: 'center' }}>
                                                <td>{item.id}</td>
                                                <td>{item.TenLoaiSanPham}</td>
                                                <td>{item.NoiDung}</td>
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
                                                Không có loại thực hiện nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <div className={cx('box-sum')}>
                                <div className={cx('box-right')}>
                                    <Pagination total={loaisps?.count} pageSize={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateAndUpdateLSP dataRaw={data} isShow={show} onSave={handleSave} onClose={handleClose} />
            <Delete isShow={isShowDelete} onOk={handleOKDelete} onClose={() => setIsShowDelete(false)} />
            <ToastContainer
                position="top-center"
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

export default LoaiSanPham;
