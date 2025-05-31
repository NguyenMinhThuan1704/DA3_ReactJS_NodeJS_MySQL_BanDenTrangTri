/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './GioHang.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import cartService from '../../../services/cartService';
import sanphamService from '../../../services/sanphamService';
import hoadonbanService from '../../../services/hoadonbanService';
import chitiethoadonbanService from '../../../services/chitiethoadonbanService';
import config from '~/config';
import { getFirstImage } from '../../getFirstImage';
import { createPaymentLink } from '../../../services/qrcode';

const cx = classNames.bind(styles);

function GioHang() {
    const [carts, setCarts] = useState({ rows: [], count: 0 });
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('cash');

    // localStorage.setItem('soluong', carts.rows.length);

    const fetchData = () => {
        const taikhoan = JSON.parse(localStorage.getItem('taikhoan'));
        const id = taikhoan.id;
        Promise.all([sanphamService.getSanPhamAll(), cartService.getCartByAcc({ id })])
            .then(([sanphamRes, cartRes]) => {
                const sanphams = sanphamRes.data.data.rows;
                const carts = cartRes.data.data;

                const mergedData = carts.map((cart) => {
                    const sanpham = sanphams.find((sp) => sp.id === cart.MaSanPham);

                    return {
                        ...cart,
                        TenSanPham: sanpham ? sanpham.TenSanPham : 'Unknown',
                        AnhDaiDien: sanpham ? sanpham.AnhDaiDien : 'Unknown',
                        Gia: sanpham ? sanpham.Gia : 'Unknown',
                        GiaGiam: sanpham ? sanpham.GiaGiam : 'Unknown',
                    };
                });
                setCarts({ rows: mergedData, count: sanphamRes.data.data.count });
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteCart = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            try {
                await cartService.deleteCart(id);
                const updatedCarts = carts.rows.filter((item) => item.id !== id);
                setCarts({ ...carts, rows: updatedCarts });
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
            } catch (error) {
                toast.error('Xóa thất bại!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                console.error('Error deleting cart:', error);
            }
        }
    };

    useEffect(() => {
        // Tính toán tổng giá trị của giỏ hàng khi có sự thay đổi trong sản phẩm hoặc số lượng
        const total = carts.rows.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.Gia * currentItem.SoLuong;
        }, 0);
        setTotalPrice(total);
    }, [carts]);

    const handleChangeQuantity = (id, newSoLuong) => {
        try {
            const data = {
                SoLuong: newSoLuong,
            };
            cartService.updateCart(id, data);

            // Cập nhật số lượng sản phẩm trong state
            const updatedCarts = carts.rows.map((item) => (item.id === id ? { ...item, SoLuong: newSoLuong } : item));
            setCarts({ ...carts, rows: updatedCarts });
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            TenKH: '',
            SoDienThoai: '',
            DiaChi: '',
            Email: '',
        },
        validationSchema: Yup.object({
            TenKH: Yup.string().required('Họ và tên không được để trống'),
            SoDienThoai: Yup.string()
                .matches(/^\d{10}$/, 'Số điện thoại phải có 10 ký tự và chỉ chứa số')
                .required('Số điện thoại không được để trống'),
            DiaChi: Yup.string().required('Địa chỉ không được để trống'),
            Email: Yup.string().email('Email không hợp lệ'),
        }),
        onSubmit: async (values) => {
            if (paymentMethod === 'online') {
                localStorage.setItem('checkoutInfo', JSON.stringify(values));
                try {
                    const response = await createPaymentLink();
                    if (response && response.data && response.data.checkoutUrl) {
                        window.location.href = response.data.checkoutUrl;
                    } else {
                        alert('Không nhận được link thanh toán từ hệ thống!');
                    }
                } catch (error) {}
                return;
            }
            const taikhoan = JSON.parse(localStorage.getItem('taikhoan'));
            const id = taikhoan.id;
            const hoaDonData = {
                MaKH: id,
                TenKH: values.TenKH,
                SoDienThoai: values.SoDienThoai,
                DiaChi: values.DiaChi,
                Email: values.Email,
                TrangThaiDuyet: false,
                Shipped: false,
                TongGia: totalPrice,
                TrangThai: 'Chưa duyệt',
            };
            const hoaDonResponse = await hoadonbanService.createHoaDonBan(hoaDonData);
            try {
                const maHoaDonBan = hoaDonResponse.data.data.id;

                carts.rows.forEach(async (item) => {
                    const chiTietHoaDonData = {
                        MaHoaDonBan: maHoaDonBan,
                        MaSanPham: item.MaSanPham,
                        SoLuongCTHDB: item.SoLuong,
                        GiaCTHDB: item.Gia,
                        TongGia: item.Gia * item.SoLuong,
                    };
                    await chitiethoadonbanService.createChiTietHoaDonBan(chiTietHoaDonData);
                });

                toast.success('Đặt hàng thành công!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                await cartService.deleteCartByAcc(id);
                setTimeout(() => {
                    navigate(config.routes.home);
                }, 2500);
            } catch (error) {
                console.error('Error creating order:', error);
                toast.error('Đặt hàng thất bại!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        },
    });

    return (
        <div className={cx('container', 'grid', 'wide')}>
            <ToastContainer />
            <div className={cx('new_title')}>
                <ul className={cx('breadcrumb', 'title-h2')}>
                    <li className={cx('breadcrumb-item')}>
                        <a href="" title="Trang chủ">
                            Trang chủ
                        </a>
                    </li>
                    <li className={cx('breadcrumb-item')}>
                        <a href="" title="Giỏ hàng">
                            Giỏ hàng
                        </a>
                    </li>
                </ul>
            </div>

            <div
                className={cx('row', 'grid', 'wide', 'wrapper')}
                style={{ justifyContent: 'space-between', margin: '30px 0' }}
            >
                <div className={cx('col', 'c-6')} style={{ backgroundColor: '#fff' }}>
                    <div className={cx('content')}>
                        <div className={cx('title-text')}>
                            <span>Thông Tin Khách Hàng</span>
                        </div>
                    </div>

                    <form
                        onSubmit={formik.handleSubmit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') e.preventDefault();
                        }}
                    >
                        <div
                            className={cx('row', 'thongtin')}
                            style={{ display: 'flex', flexWrap: 'wrap', marginRight: '-15px', marginLeft: '-15px' }}
                        >
                            <div className={cx('c-12', 'thongtin_title')}>
                                <p>Họ và tên (*):</p>
                                <div className={cx('form-group')} id="input-name">
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="TenKH"
                                        name="TenKH"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.TenKH}
                                        placeholder="Họ và tên (*)"
                                    />
                                    {formik.touched.TenKH && formik.errors.TenKH ? (
                                        <span className={cx('error')}>{formik.errors.TenKH}</span>
                                    ) : null}
                                </div>
                            </div>

                            <div className={cx('c-12', 'thongtin_title')}>
                                <p>Số điện thoại (*):</p>
                                <div className={cx('form-group')} id="input-phone">
                                    <input
                                        className={cx('form-control', 'phone')}
                                        id="SoDienThoai"
                                        name="SoDienThoai"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.SoDienThoai}
                                        type="text"
                                        placeholder="Số điện thoại (*)"
                                    />
                                    {formik.touched.SoDienThoai && formik.errors.SoDienThoai ? (
                                        <span className={cx('error')}>{formik.errors.SoDienThoai}</span>
                                    ) : null}
                                </div>
                            </div>

                            <div className={cx('c-12', 'thongtin_title')}>
                                <p>Địa chỉ (*):</p>
                                <div className={cx('form-group')} id="input-address">
                                    <input
                                        className={cx('form-control', 'address')}
                                        id="DiaChi"
                                        name="DiaChi"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.DiaChi}
                                        type="text"
                                        placeholder="Địa chỉ"
                                    />
                                    {formik.touched.DiaChi && formik.errors.DiaChi ? (
                                        <span className={cx('error')}>{formik.errors.DiaChi}</span>
                                    ) : null}
                                </div>
                            </div>

                            <div className={cx('c-12', 'thongtin_title')}>
                                <p>Email:</p>
                                <div className={cx('form-group')} id="input-email">
                                    <input
                                        className={cx('form-control', 'email')}
                                        id="Email"
                                        name="Email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Email}
                                        type="text"
                                        placeholder="Email"
                                    />
                                    {formik.touched.Email && formik.errors.Email ? (
                                        <span className={cx('error')}>{formik.errors.Email}</span>
                                    ) : null}
                                </div>
                            </div>
                            <button className={cx('btn__shopping--cart')} type="submit">
                                <FontAwesomeIcon icon={faArrowRight} />
                                Đặt hàng
                            </button>
                        </div>
                    </form>
                </div>

                <div className={cx('col', 'c-6')} style={{ backgroundColor: '#fff' }}>
                    <div className={cx('title-text')}>
                        <span>Giỏ Hàng Của Bạn</span>
                    </div>

                    <div className={cx('product__wrapper', 'gio_hang')}>
                        {carts.rows.length === 0 ? (
                            <div className={cx('empty-cart')}>Giỏ hàng rỗng</div>
                        ) : (
                            carts.rows.map((item) => {
                                const firstUrl = getFirstImage(item.AnhDaiDien);

                                return (
                                    <div
                                        key={item.id}
                                        className={cx('row', 'grid', 'wide')}
                                        style={{ marginTop: '10px' }}
                                    >
                                        <div className={cx('col', 'c-12')} style={{ padding: '0', display: 'flex' }}>
                                            <div className={cx('col', 'c-2', 'product__img')}>
                                                <a href="" className={cx('product__img-link')}>
                                                    <img src={firstUrl} alt="" className={cx('img')} />
                                                </a>
                                            </div>
                                            <div className={cx('col', 'c-10', 'product__thongtin')}>
                                                <div className={cx('name-cart')}>
                                                    <span>{item.TenSanPham}</span>
                                                </div>
                                                <div>
                                                    <span>
                                                        Mã sản phẩm : <b>{item.MaSanPham}</b>
                                                    </span>
                                                </div>
                                                <div className={cx('price__wrapper')}>
                                                    <div className={cx('row', 'grid', 'wide', 'price__chitiet')}>
                                                        <div className={cx('col', 'c-6')}>
                                                            <div className={cx('number')}>
                                                                <div className={cx('number__left')}>Số lượng:</div>
                                                                <div className={cx('number__left', 'quantity-input')}>
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        value={item.SoLuong}
                                                                        onChange={(e) =>
                                                                            handleChangeQuantity(
                                                                                item.id,
                                                                                parseInt(e.target.value),
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('col', 'c-6')} style={{ display: 'flex' }}>
                                                            <div className={cx('price')}>
                                                                Giá bán :{' '}
                                                                <span>
                                                                    {item.Gia.toLocaleString()}
                                                                    <sup>đ</sup>
                                                                </span>
                                                            </div>
                                                            <button
                                                                style={{
                                                                    backgroundColor: 'transparent',
                                                                }}
                                                                onClick={() => handleDeleteCart(item.id)}
                                                                className={cx('delete')}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* <button className={cx('deleteProductAll')}>Xóa hết giỏ hàng</button> */}

                    <div className={cx('tongtien')}>
                        <div className={cx('tongtien__left')}>Tổng thanh toán:</div>
                        <div className={cx('tongtien__right')}>
                            <span id="totalPrice">
                                {totalPrice.toLocaleString()}
                                <sup>đ</sup>
                            </span>
                        </div>
                    </div>

                    <div className={cx('payment')}>
                        <div className={cx('title_thanhtoan')}>Phương thức thanh toán</div>
                        <ul className={cx('payment__methonds')}>
                            <li className={cx('payment__methonds-item')}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="cashPayment"
                                    value="cash"
                                    checked={paymentMethod === 'cash'}
                                    onChange={() => setPaymentMethod('cash')}
                                />
                                <label htmlFor="cashPayment">Thanh toán bằng tiền mặt</label>
                            </li>
                            <li className={cx('payment__methonds-item')}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="onlinePayment"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={() => setPaymentMethod('online')}
                                />
                                <label htmlFor="onlinePayment">Thanh toán online bằng thẻ visa, master, ATM</label>
                            </li>
                        </ul>

                        <Link to={config.routes.home} className={cx('muasanphamkhac')}>
                            Mua thêm sản phẩm khác
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GioHang;
