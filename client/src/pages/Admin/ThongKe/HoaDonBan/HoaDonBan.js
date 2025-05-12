/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './HoaDonBan.module.scss';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../../../components/Pagination/Pagination';
import hoadonbanService from '../../../../services/hoadonbanService';
import numeral from 'numeral';
import { faChartColumn, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

function HoaDonBan() {
    const [results, setResults] = useState({ rows: [], count: 0 });
    const [searchParams] = useSearchParams();
    // const [totals, setTotals] = useState({
    //     totalSoLuong: 0,
    //     totalTongTien: 0,
    // });

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().slice(0, 10);

    const [data, setData] = useState({
        tenkh: '',
        frdate: currentDateString || '',
        todate: currentDateString || '',
    });

    const fetchData = () => {
        const page = Number(searchParams.get('page'));
        if (page > 0) {
            hoadonbanService.TKHoaDonBan({ page, data }).then((res) => {
                setResults(res.data.data);
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchParams]);

    // useEffect(() => {
    //     if (results.rows.length > 0) {
    //         const totalSoLuong = results.rows.reduce((total, item) => total + item.SoLuongCTHDB, 0);
    //         const totalTongTien = results.rows.reduce(
    //             (total, item) =>
    //                 numeral(total)
    //                     .add(item.TongGia)
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

    return (
        <>
            <div className={cx('title')}>
                <FontAwesomeIcon icon={faChartColumn} />
                Thống kê hóa đơn bán
                <hr />
            </div>
            <form style={{ display: 'flex' }} onSubmit={handleSearch}>
                <div className={cx('row')} style={{ width: '100%', marginRight: 0, marginLeft: 0 }}>
                    <div className={cx('col-2', 'col-s-12', 'padding-box')}>
                        <label htmlFor="txtright">Tên khách hàng:</label>
                    </div>
                    <div className={cx('col-10', 'col-s-12', 'padding-box')}>
                        <input
                            type="text"
                            name="tenkh"
                            value={data.tenkh}
                            onChange={handleInputChange}
                            placeholder="Nhập tên khách hàng..."
                        />
                    </div>
                    <div className={cx('col-1', 'col-s-12', 'padding-box')}>
                        <label htmlFor="txtright">Từ ngày:</label>
                    </div>
                    <div className={cx('col-11', 'col-s-12', 'padding-box')}>
                        <input name="frdate" value={data.frdate} onChange={handleInputChange} type="date" />
                    </div>
                    <div className={cx('col-1', 'col-s-12', 'padding-box')}>
                        <label htmlFor="txtright">Đến ngày:</label>
                    </div>
                    <div className={cx('col-11', 'col-s-12', 'padding-box')}>
                        <input name="todate" value={data.todate} onChange={handleInputChange} type="date" />
                    </div>
                    <div className={cx('col-4', 'col-s-12', 'padding-box')}>
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
                                <th>Tên khách hàng</th>
                                <th>Địa chỉ</th>
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
                                        <td>{result.TenKH}</td>
                                        <td>{result.DiaChi}</td>
                                        <td>{result.TenSanPham}</td>
                                        <td>{result.SoLuongCTHDB}</td>
                                        <td>{result.createdAt}</td>
                                        <td>{numeral(result.TongGia).format('0,0')}đ</td>
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
                        Số lượng sản phẩm đã bán: {totals.totalSoLuong || 0}
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
                            <button>
                                <a href="" style={{ color: '#fff', textDecoration: 'none' }}>
                                    In thống kê hóa đơn bán
                                </a>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HoaDonBan;
