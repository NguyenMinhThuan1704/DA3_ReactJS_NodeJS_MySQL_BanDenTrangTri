/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DonHang.module.scss';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination';
import hoadonbanService from '../../../services/hoadonbanService';
import chitiethoadonbanService from '../../../services/chitiethoadonbanService';
import sanphamService from '../../../services/sanphamService';
import numeral from 'numeral';
import { getFirstImage } from '../../getFirstImage';
import danhgiaService from '../../../services/danhgiaService';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function DonHang() {
    const [chiTietHoaDons, setChiTietHoaDons] = useState([]);
    const [searchParams] = useSearchParams();
    const POLL_INTERVAL = 3000;
    const taikhoan = JSON.parse(localStorage.getItem('token'));
    const id = taikhoan.id;
    const [reviews, setReviews] = useState({});
    const [reviewedProducts, setReviewedProducts] = useState({});

    const fetchHoaDonBans = async () => {
        const page = Number(searchParams.get('page'));
        const MaKH = id;
        if (page > 0) {
            try {
                const res = await hoadonbanService.getHoaDonBanByAcc({ page, MaKH });
                const hoaDons = res.data.data.rows;

                const chiTietPromises = hoaDons.map((hoaDon) => {
                    const MaHoaDonBan = hoaDon.id;
                    return chitiethoadonbanService.getChiTietHoaDonBanByMaHD({ page, MaHoaDonBan });
                });
                const chiTietResponses = await Promise.all(chiTietPromises);

                const combinedChiTietData = chiTietResponses.flatMap((response) => response.data.data.rows);

                const processedData = combinedChiTietData.reduce((acc, product) => {
                    const { MaSanPham, SoLuongCTHDB, TongGia } = product;
                    if (!acc[MaSanPham]) {
                        acc[MaSanPham] = { ...product };
                    } else {
                        acc[MaSanPham].SoLuongCTHDB += SoLuongCTHDB;
                        acc[MaSanPham].TongGia += TongGia;
                    }
                    return acc;
                }, {});

                const processedDataArray = Object.values(processedData);

                const productDetailsPromises = processedDataArray.map((product) =>
                    sanphamService.getSanPhamById(product.MaSanPham),
                );
                const productDetailsResponses = await Promise.all(productDetailsPromises);

                const combinedData = processedDataArray.map((product, index) => {
                    const correspondingOrder = hoaDons.find((order) => order.id === product.MaHoaDonBan);
                    return {
                        ...product,
                        ...correspondingOrder,
                        ...productDetailsResponses[index].data.data,
                    };
                });

                setChiTietHoaDons(combinedData);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        }
    };

    const handleButtonClick = async (product) => {
        if (product.TrangThaiDuyet === 1 && product.Shipped === 1) {
            try {
                const id = product.MaHoaDonBan;
                const data = {
                    TrangThai: 'Hoàn thành',
                };
                await hoadonbanService.updateHoaDonBan(data, id);
                fetchHoaDonBans();
            } catch (error) {
                console.error('Failed to update order status', error);
            }
        }
    };

    useEffect(() => {
        fetchHoaDonBans();
        const timer = setInterval(() => {
            fetchHoaDonBans();
        }, POLL_INTERVAL);
        return () => clearInterval(timer);
    }, [searchParams]);

    useEffect(() => {
        if (chiTietHoaDons.length > 0) {
            const fetchReviewedProducts = async () => {
                const promises = chiTietHoaDons.map((product) =>
                    danhgiaService.getDanhGia({
                        page: 1,
                        MaSanPham: product.MaSanPham,
                        MaKhachHang: id,
                    }),
                );
                const results = await Promise.all(promises);
                const map = {};
                chiTietHoaDons.forEach((product, idx) => {
                    map[product.MaSanPham] = results[idx].data.data.rows.length > 0;
                });
                setReviewedProducts(map);
            };
            fetchReviewedProducts();
        }
    }, [chiTietHoaDons, id]);

    const handleReviewChange = (MaSanPham, value) => {
        setReviews((prev) => ({
            ...prev,
            [MaSanPham]: {
                ...prev[MaSanPham],
                content: value,
            },
        }));
    };

    const handleStarChange = (MaSanPham, value) => {
        setReviews((prev) => ({
            ...prev,
            [MaSanPham]: {
                ...prev[MaSanPham],
                star: value,
            },
        }));
    };

    const handleReviewSubmit = async (product) => {
        const MaSanPham = product.MaSanPham;
        const data = {
            MaSanPham: MaSanPham,
            MoTa: reviews[MaSanPham]?.content || '',
            SoSao: reviews[MaSanPham]?.star || 5,
            MaKhachHang: id,
        };
        try {
            await danhgiaService.createDanhGia(data);
            toast.success('Đánh giá thành công!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setReviews((prev) => ({
                ...prev,
                [MaSanPham]: { content: '', star: 5 },
            }));
            setReviewedProducts((prev) => ({
                ...prev,
                [MaSanPham]: true,
            }));
        } catch (error) {
            toast.error('Đánh giá thất bại!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    return (
        <div className={cx('container', 'grid', 'wide')}>
            <ToastContainer />

            <div
                className={cx('row', 'grid', 'wide', 'wrapper')}
                style={{ justifyContent: 'space-between', margin: '30px 0' }}
            >
                <div className={cx('col', 'c-12')} style={{ backgroundColor: '#fff', height: 'auto' }}>
                    <div className={cx('content')}>
                        <div className={cx('title-text')}>
                            <span>Thông tin đơn hàng</span>
                        </div>
                        <div className={cx('product-list')}>
                            {chiTietHoaDons.map((product) => {
                                const firstUrl = getFirstImage(product.AnhDaiDien);

                                return (
                                    <div key={product.id} className={cx('product-item')}>
                                        <div className={cx('product-image')}>
                                            <img src={firstUrl} alt={firstUrl} />
                                        </div>
                                        <div className={cx('product-details')}>
                                            <div className={cx('product-name')}>{product.TenSanPham}</div>
                                            <div className={cx('product-price')}>
                                                Giá: {numeral(product.GiaCTHDB).format('0,0')} VND
                                            </div>
                                            <div className={cx('product-quantity')}>
                                                Số lượng: {product.SoLuongCTHDB}
                                            </div>
                                            <div className={cx('product-total')}>
                                                Thành tiền: {numeral(product.TongGia).format('0,0')} VND
                                            </div>
                                        </div>
                                        <div className={cx('product-action')}>
                                            {product.TrangThaiDuyet === 0 ? (
                                                <button
                                                    style={{
                                                        opacity: 0.8,
                                                        cursor: 'default',
                                                    }}
                                                    className={cx('buy-button')}
                                                >
                                                    Chờ xác nhận
                                                </button>
                                            ) : product.TrangThaiDuyet === 1 && product.Shipped === 0 ? (
                                                <button
                                                    style={{
                                                        opacity: 0.8,
                                                        cursor: 'default',
                                                    }}
                                                    className={cx('buy-button')}
                                                >
                                                    Chờ đơn vị vận chuyển
                                                </button>
                                            ) : product.TrangThaiDuyet === 1 &&
                                              product.Shipped === 1 &&
                                              product.TrangThai !== 'Hoàn thành' ? (
                                                <button
                                                    className={cx('buy-button')}
                                                    onClick={() => handleButtonClick(product)}
                                                >
                                                    Đã nhận được hàng
                                                </button>
                                            ) : product.TrangThaiDuyet === 1 &&
                                              product.Shipped === 1 &&
                                              product.TrangThai === 'Hoàn thành' ? (
                                                <button
                                                    style={{
                                                        opacity: 0.8,
                                                        cursor: 'default',
                                                    }}
                                                    className={cx('buy-button')}
                                                    disabled
                                                >
                                                    Hoàn thành
                                                </button>
                                            ) : null}
                                            {product.TrangThaiDuyet === 1 &&
                                                product.Shipped === 1 &&
                                                product.TrangThai === 'Hoàn thành' &&
                                                (reviewedProducts[product.MaSanPham] ? (
                                                    <div
                                                        style={{
                                                            color: 'green',
                                                            marginTop: 8,
                                                            fontStyle: 'italic',
                                                            minWidth: '240px',
                                                        }}
                                                    >
                                                        Bạn đã đánh giá sản phẩm này!
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{ marginTop: 8, textAlign: 'right', minWidth: '240px' }}
                                                    >
                                                        <textarea
                                                            placeholder="Nhập đánh giá của bạn..."
                                                            value={reviews[product.MaSanPham]?.content || ''}
                                                            onChange={(e) =>
                                                                handleReviewChange(product.MaSanPham, e.target.value)
                                                            }
                                                            rows={3}
                                                            style={{
                                                                width: '100%',
                                                                resize: 'vertical',
                                                                padding: '4px',
                                                            }}
                                                        />
                                                        <div style={{ marginBottom: 6 }}>
                                                            <span>Chọn số sao: </span>
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <label key={star} style={{ marginRight: 4 }}>
                                                                    <input
                                                                        type="radio"
                                                                        name={`star_${product.MaSanPham}`}
                                                                        value={star}
                                                                        checked={
                                                                            (reviews[product.MaSanPham]?.star || 5) ===
                                                                            star
                                                                        }
                                                                        onChange={() =>
                                                                            handleStarChange(product.MaSanPham, star)
                                                                        }
                                                                    />
                                                                    <span style={{ color: '#f5a623' }}>★</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        <button
                                                            className={cx('buy-button')}
                                                            style={{ background: '#007bff', color: '#fff' }}
                                                            onClick={() => handleReviewSubmit(product)}
                                                        >
                                                            Đánh giá
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                            <div className={cx('box-sum')}>
                                <div className={cx('box-right')}>
                                    <Pagination total={chiTietHoaDons.length} pageSize={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonHang;
