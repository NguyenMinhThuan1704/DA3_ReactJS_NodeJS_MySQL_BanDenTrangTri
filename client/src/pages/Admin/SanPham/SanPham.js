/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import sanphamService from '../../../services/sanphamService';
import loaispService from '../../../services/loaispService';
import CreateAndUpdateSanPham from './CreateAndUpdateSanPham';
import Delete from './Delete';
import Pagination from '../../../components/Pagination/Pagination';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SanPham.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faBarcode, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Search from '../../../components/Search/Search';
import Image from '../../../components/Image';
import { getFirstImage } from '../../getFirstImage';
import danhgiaService from '../../../services/danhgiaService';
import ViewSanPhamModal from './ViewSanPhamModal';

const cx = classNames.bind(styles);

function SanPham() {
    const [show, setShow] = useState(false);

    const [data, setData] = useState(false);

    const [isShowDelete, setIsShowDelete] = useState(false);

    const [id, setID] = useState(0);

    const [searchParams] = useSearchParams();

    const [sanphams, setSanPhams] = useState({ rows: [], count: 0 });

    const [loaisanphams, setLoaiSanPhams] = useState([]);

    const [searchValue, setSearchValue] = useState('');

    const [showView, setShowView] = useState(false);
    const [viewData, setViewData] = useState(null);
    const [reviewPage, setReviewPage] = useState(1);
    const [danhgias, setDanhGias] = useState({ rows: [], count: 0 });

    const handleOKDelete = () => {
        sanphamService
            .deleteSanPham(id)
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
                // fetchData();
                fetchDataSearch();
            })
            .catch((err) => console.error(err));
    };

    const handleShow = () => {
        setData(undefined);
        setShow(true);
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchValue(value);
    };

    const handleAdd = (item) => {
        const itemWithQuantity = { ...item, SoLuong: 1 };

        const hdnData = JSON.parse(localStorage.getItem('hdn')) || [];

        hdnData.push(itemWithQuantity);

        localStorage.setItem('hdn', JSON.stringify(hdnData));

        toast.success('Đã thêm sản phẩm vào hóa đơn nhập!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
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

    const fetchDataSearch = () => {
        if (Number(searchParams.get('page')) > 0 && !(show || isShowDelete)) {
            Promise.all([
                sanphamService.searchSanPham({
                    page: Number(searchParams.get('page')),
                    value: searchValue,
                }),
                loaispService.getCategoryAll(),
            ])
                .then(([sanphamRes, loaispRes]) => {
                    const sanphams = sanphamRes.data.data.rows;
                    const loaisps = loaispRes.data.data.rows;

                    const mergedData = sanphams.map((sp) => {
                        const loaiSP = loaisps.find((lsp) => lsp.id === sp.MaLoaiSanPham);
                        return {
                            ...sp,
                            TenLoaiSanPham: loaiSP ? loaiSP.TenLoaiSanPham : 'Unknown',
                        };
                    });

                    setSanPhams({ rows: mergedData, count: sanphamRes.data.data.count });
                    setLoaiSanPhams(loaisps);
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        // fetchData();
        fetchDataSearch();
    }, [searchParams, show, isShowDelete, searchValue]);

    const handleSave = (data, type) => {
        const savePromise =
            type === 'create' ? sanphamService.createSanPham(data) : sanphamService.updateSanPham(data, data.id);

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
                fetchDataSearch();
            })
            .catch((err) => console.error(err));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleView = (item) => {
        setViewData(item);
        setShowView(true);
        setReviewPage(1);
    };

    const fetchDanhGias = (MaSanPham, page = 1) => {
        danhgiaService.getDanhGia({ page, MaSanPham }).then((res) => {
            setDanhGias({
                rows: res.data.data.rows,
                count: res.data.data.count,
            });
        });
    };

    useEffect(() => {
        if (showView && viewData) {
            fetchDanhGias(viewData.id, reviewPage);
        }
    }, [showView, viewData, reviewPage]);

    return (
        <div className={cx('col-12', 'col-s-12', 'content')}>
            <div className={cx('col-12', 'col-s-12')}>
                <div className={cx('tabcontent')}>
                    <div className={cx('title')}>
                        <FontAwesomeIcon icon={faBarcode} /> Danh sách sản phẩm
                    </div>
                    <form>
                        <div className={cx('row')}>
                            <div className={cx('col-4', 'col-s-12', 'padding-box')}>
                                <Search value={searchValue} onChange={handleSearchChange} />
                            </div>
                            {/* <div className={cx('col-6', 'col-s-12', 'padding-box')}>
                                <select name="MaLoaiTK">
                                    <option value="">--Chọn loại sản phẩm--</option>
                                    {loaisanphams.map((loai) => (
                                        <option key={loai.id} value={loai.id}>
                                            {loai.TenLoaiSanPham}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                        </div>
                    </form>
                    <a className="">
                        <button
                            className={cx('btn-form', 'submit')}
                            style={{ backgroundColor: 'rgba(44, 140, 15, 0.8)', marginLeft: '8px' }}
                            onClick={handleShow}
                        >
                            Thêm sản phẩm
                        </button>
                    </a>
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <table className="myTable">
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th>Mã sản phẩm</th>
                                        <th>Loại sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Ảnh đại diện</th>
                                        <th>Giá</th>
                                        <th>Giá giảm</th>
                                        <th>Số lượng</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày chỉnh sửa</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {sanphams.rows.length > 0 ? (
                                        sanphams.rows.map((item) => {
                                            const firstUrl = getFirstImage(item.AnhDaiDien);
                                            return (
                                                <tr style={{ textAlign: 'center' }}>
                                                    <td>{item.id}</td>
                                                    <td>{item.TenLoaiSanPham}</td>
                                                    <td>{item.TenSanPham}</td>
                                                    <td>
                                                        <Image src={firstUrl}></Image>
                                                    </td>
                                                    <td>{numeral(item.Gia).format('0,0')}</td>
                                                    <td>{numeral(item.GiaGiam).format('0,0')}</td>
                                                    <td>{item.SoLuong}</td>
                                                    <td>{formatDate(item.createdAt)}</td>
                                                    <td>{formatDate(item.updatedAt)}</td>
                                                    <td>
                                                        <button onClick={() => handleView(item)}>
                                                            <FontAwesomeIcon icon={faEye} title="Xem chi tiết" />
                                                        </button>
                                                        <button onClick={() => handleAdd(item)}>
                                                            <FontAwesomeIcon icon={faAdd} title="Thêm" />
                                                        </button>
                                                        <button onClick={() => handleEdit(item)}>
                                                            <FontAwesomeIcon icon={faEdit} title="Sửa" />
                                                        </button>
                                                        {/* <button onClick={() => handleDelete(item.id)}>
                                                        <FontAwesomeIcon icon={faTrash} title="Xóa" />
                                                    </button> */}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="10" style={{ textAlign: 'center' }}>
                                                Không có sản phẩm nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <div className={cx('box-sum')}>
                                <div className={cx('box-right')}>
                                    <Pagination total={sanphams.count} pageSize={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateAndUpdateSanPham dataRaw={data} isShow={show} onSave={handleSave} onClose={handleClose} />
            <Delete isShow={isShowDelete} onOk={handleOKDelete} onClose={() => setIsShowDelete(false)} />
            <ViewSanPhamModal
                show={showView}
                onHide={() => setShowView(false)}
                sanPham={viewData}
                danhgias={danhgias}
                page={reviewPage}
                pageSize={10}
                total={danhgias.count}
                onPageChange={setReviewPage}
            />

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

export default SanPham;
