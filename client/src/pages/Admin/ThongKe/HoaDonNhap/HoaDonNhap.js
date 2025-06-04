/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './HoaDonNhap.module.scss';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faSearch } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../../../components/Pagination/Pagination';

import nhaphanphoiService from '../../../../services/nhaphanphoiService';
import taikhoanService from '../../../../services/taikhoanService';
import hoadonnhapService from '../../../../services/hoadonnhapService';
import numeral from 'numeral';

const cx = classNames.bind(styles);

function HoaDonNhap() {
    const [nhaphanphos, setNhaPhanPhois] = useState({ rows: [], count: 0 });
    const [taikhoans, setTaiKhoans] = useState({ rows: [], count: 0 });
    const [results, setResults] = useState({ rows: [], count: 0 });
    const [searchParams] = useSearchParams();
    // const [totals, setTotals] = useState({
    //     totalSoLuong: 0,
    //     totalTongTien: 0,
    // });

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().slice(0, 10);

    const [data, setData] = useState({
        matk: 0,
        manpp: 0,
        frdate: currentDateString || '',
        todate: currentDateString || '',
    });

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0) {
            nhaphanphoiService.getNhaPhanPhoiAll({ page: Number(searchParams.get('page')) }).then((res) => {
                setNhaPhanPhois(res.data.data);
            });
        }
    }, [searchParams]);

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0) {
            taikhoanService.getTaiKhoanAll({ page: Number(searchParams.get('page')) }).then((res) => {
                setTaiKhoans(res.data.data);
            });
        }
    }, [searchParams]);

    const fetchData = () => {
        const page = Number(searchParams.get('page'));
        if (page > 0) {
            hoadonnhapService.TKHoaDonNhap({ page, data }).then((res) => {
                setResults(res.data.data);
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchParams]);

    // useEffect(() => {
    //     if (results.rows.length > 0) {
    //         const totalSoLuong = results.rows.reduce((total, item) => total + item.SoLuongCTHDN, 0);
    //         const totalTongTien = results.rows.reduce(
    //             (total, item) =>
    //                 numeral(total)
    //                     .add(item.TongTienCTHDN)
    //                     .value(),
    //             0,
    //         );
    //         setTotals({ totalSoLuong, totalTongTien });
    //     } else {
    //         setTotals({ totalSoLuong: 0, totalTongTien: 0 });
    //     }
    // }, [results]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        fetchData();
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <div className={cx('title')}>
                <FontAwesomeIcon icon={faChartColumn} />
                Thống kê hóa đơn nhập
                <hr />
            </div>
            <form style={{ display: 'flex' }} onSubmit={handleSearch}>
                <div className={cx('row')} style={{ width: '100%', marginRight: 0, marginLeft: 0 }}>
                    <div className={cx('col-6', 'padding-box')}>
                        <select name="matk" value={data.matk} onChange={handleInputChange}>
                            <option value="0">--Chọn nhân viên nhập--</option>
                            {taikhoans.rows.length > 1 ? (
                                taikhoans.rows.map((type) => {
                                    if (type.MaLoaiTK === 1 || type.MaLoaiTK === 2) {
                                        return (
                                            <option key={type.id} value={type.id}>
                                                {type.id} - {type.TaiKhoan}
                                            </option>
                                        );
                                    }
                                    return null;
                                })
                            ) : (
                                <option value=""> - Không có nhân viên nào - </option>
                            )}
                        </select>
                    </div>
                    <div className={cx('col-6', 'padding-box')}>
                        <select name="manpp" value={data.manpp} onChange={handleInputChange}>
                            <option value="0">--Chọn nhà phân phối--</option>
                            {nhaphanphos.rows.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.id} - {type.TenNhaPhanPhoi}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('col-1', 'padding-box')}>
                        <label htmlFor="txtright">Từ ngày:</label>
                    </div>
                    <div className={cx('col-11', 'padding-box')}>
                        <input
                            name="frdate"
                            value={data.frdate}
                            onChange={handleInputChange}
                            type="date"
                            id="search-export-fr-hdn"
                        />
                    </div>
                    <div className={cx('col-1', 'padding-box')}>
                        <label htmlFor="txtright">Đến ngày:</label>
                    </div>
                    <div className={cx('col-11', 'padding-box')}>
                        <input
                            name="todate"
                            value={data.todate}
                            onChange={handleInputChange}
                            type="date"
                            id="search-export-to-hdn"
                        />
                    </div>
                    <div className={cx('col-4', 'padding-box')} style={{ float: 'right' }}>
                        <button type="submit">
                            <FontAwesomeIcon icon={faSearch} /> Tìm kiếm
                        </button>
                    </div>
                </div>
            </form>
            <div className={cx('row')}>
                <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                    <table className={cx('myTable')}>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>Nhân viên</th>
                                <th>Nhà phân phối</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Ngày tạo</th>
                                <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.rows.length > 0 ? (
                                results.rows.map((result, index) => (
                                    <tr key={index} style={{ textAlign: 'center' }}>
                                        <td>{result.TaiKhoan}</td>
                                        <td>{result.TenNhaPhanPhoi}</td>
                                        <td>{result.TenSanPham}</td>
                                        <td>{result.SoLuongCTHDN}</td>
                                        <td>{formatDate(result.createdAt)}</td>
                                        <td>{numeral(result.TongTienCTHDN).format('0,0')}đ</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        Không có bản ghi nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                    <p>
                        Số lượng bản ghi: {results.count || 0}
                        <span></span>
                    </p>
                    {/* <p>
                        Số lượng sản phẩm đã nhập: {totals.totalSoLuong || 0}
                        <span></span>
                    </p>
                    <p>
                        Tổng tiền: {numeral(totals.totalTongTien).format('0,0') || 0}đ<span></span>
                    </p> */}
                </div>
                <div className={cx('col-12', 'col-s-12', 'padding-box')}>
                    <div
                        className={cx('col-8', 'box-sum')}
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                        <div></div>
                        <div className={cx('box-right')} style={{ margin: 0 }}>
                            <Pagination total={results.count} />
                        </div>
                        {/* <div className={cx('col-4', 'col-s-12')} style={{ float: 'left' }}>
                            <button id="inhoadonban">
                                <a href="" style={{ color: '#fff', textDecoration: 'none' }}>
                                    In thống kê hóa đơn nhập
                                </a>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HoaDonNhap;
