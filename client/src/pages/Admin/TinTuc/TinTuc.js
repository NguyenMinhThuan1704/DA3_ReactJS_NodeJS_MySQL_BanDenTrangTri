/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import tintucService from '../../../services/tintucService';
import CreateAndUpdateTinTuc from './CreateAndUpdateTinTuc';
import Delete from './Delete';
import Pagination from '../../../components/Pagination/Pagination';
import Search from '../../../components/Search/Search';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TinTuc.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { getFirstImage } from '../../getFirstImage';

const cx = classNames.bind(styles);

function TinTuc() {
    const [show, setShow] = useState(false);

    const [data, setData] = useState(false);

    const [isShowDelete, setIsShowDelete] = useState(false);

    const [id, setID] = useState(0);

    const [searchParams] = useSearchParams();

    const [tintucs, setTinTucs] = useState({ rows: [], count: 0 });

    const [searchValue, setSearchValue] = useState('');

    const handleOKDelete = () => {
        tintucService.deleteTinTuc(id);
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
            tintucService.searchTinTuc({ page: Number(searchParams.get('page')), value: searchValue }).then((res) => {
                setTinTucs(res.data.data);
            });
        }
    }, [searchParams, show, isShowDelete, searchValue]);

    const handleSave = (data, type) => {
        if (type === 'create') {
            tintucService
                .createTinTuc(data)
                .then((res) => {
                    toast.success('Tạo thành công!', {
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
        } else if (type === 'update') {
            tintucService
                .updateTinTuc(data, data.id)
                .then((res) => {
                    toast.success('Sửa thành công!', {
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
                        <FontAwesomeIcon icon={faNewspaper} /> Danh sách tin tức
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
                            title="Thêm tin tức mới"
                            onClick={handleShow}
                        >
                            Thêm tin tức
                        </button>
                    </a>
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <table className="myTable">
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th>Mã tin tức</th>
                                        <th>Tiêu đề</th>
                                        <th>Ảnh đại diện</th>
                                        <th>Mô tả</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày chỉnh sửa</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tintucs.rows.length > 0 ? (
                                        tintucs.rows.map((item) => {
                                            const firstUrl = getFirstImage(item.AnhDaiDien);

                                            return (
                                                <tr key={item.id} style={{ textAlign: 'center' }}>
                                                    <td>{item.id}</td>
                                                    <td>{item.TieuDe}</td>
                                                    <td>
                                                        <img src={firstUrl} alt="Ảnh đại diện" />
                                                    </td>
                                                    <td>{item.MoTa}</td>
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
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center' }}>
                                                Không có tin tức nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <div className={cx('box-sum')}>
                                <div className={cx('box-right')}>
                                    <Pagination total={tintucs.count} pageSize={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateAndUpdateTinTuc dataRaw={data} isShow={show} onSave={handleSave} onClose={handleClose} />
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

export default TinTuc;
