/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classNames from 'classnames/bind';
import styles from './DonHang.module.scss';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination';
import hoadonbanService from '../../../services/hoadonbanService';
import chitiethoadonbanService from '../../../services/chitiethoadonbanService';
import sanphamService from '../../../services/sanphamService';
import numeral from 'numeral';

const cx = classNames.bind(styles);

function DonHang() {
    const [chiTietHoaDons, setChiTietHoaDons] = useState([]);
    const [searchParams] = useSearchParams();

    const taikhoan = JSON.parse(localStorage.getItem('taikhoan'));
    const id = taikhoan.id;

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

                // Fetch product details
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
                // fetchHoaDonBans();
            } catch (error) {
                console.error('Failed to update order status', error);
            }
        }
    };

    useEffect(() => {
        fetchHoaDonBans();
    }, [searchParams, chiTietHoaDons]);

    return (
        <div className={cx('container', 'grid', 'wide')}>
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
                            {chiTietHoaDons.map((product) => (
                                <div key={product.id} className={cx('product-item')}>
                                    <div className={cx('product-image')}>
                                        <img src={product.AnhDaiDien} alt={product.AnhDaiDien} />
                                    </div>
                                    <div className={cx('product-details')}>
                                        <div className={cx('product-name')}>{product.TenSanPham}</div>
                                        <div className={cx('product-price')}>
                                            Giá: {numeral(product.GiaCTHDB).format('0,0')} VND
                                        </div>
                                        <div className={cx('product-quantity')}>Số lượng: {product.SoLuongCTHDB}</div>
                                        <div className={cx('product-total')}>
                                            Thành tiền: {numeral(product.TongGia).format('0,0')} VND
                                        </div>
                                    </div>
                                    <div className={cx('product-action')}>
                                        {product.TrangThaiDuyet === 0 ? (
                                            <button
                                                style={{ opacity: 0.8, cursor: 'default' }}
                                                className={cx('buy-button')}
                                            >
                                                Chờ xác nhận
                                            </button>
                                        ) : product.TrangThaiDuyet === 1 && product.Shipped === 0 ? (
                                            <button
                                                style={{ opacity: 0.8, cursor: 'default' }}
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
                                                style={{ opacity: 0.8, cursor: 'default' }}
                                                className={cx('buy-button')}
                                                disabled
                                            >
                                                Hoàn thành
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
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
