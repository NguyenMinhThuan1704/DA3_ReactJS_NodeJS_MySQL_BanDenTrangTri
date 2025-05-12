/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import styles from './HoaDonNhap.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import hoadonnhapService from '../../../services/hoadonnhapService';
import chitiethoadonnhapService from '../../../services/chitiethoadonnhapService';

import nhaphanphoiService from '../../../services/nhaphanphoiService';
import taikhoanService from '../../../services/taikhoanService';
import config from '~/config';
import numeral from 'numeral';
import { getFirstImage } from '../../getFirstImage';

const cx = classNames.bind(styles);

function CreateHDN({ dataRaw, isShow, onClose }) {
    const formRef = useRef();

    const [validated, setValidated] = useState(false);

    const [searchParams] = useSearchParams();

    const [totalTongTien, setTotalTongTien] = useState(0);

    const [nhaphanphos, setNhaPhanPhois] = useState({ rows: [], count: 0 });
    const [taikhoans, setTaiKhoans] = useState({ rows: [], count: 0 });
    const [spData, setSanPhamData] = useState([]);

    const [data, setData] = useState({
        id: 0,
        MaNhaPhanPhoi: '',
        MaTaiKhoan: '',
        KieuThanhToan: '',
        TongTien: '',
    });

    const calculateTotal = () => {
        let total = 0;
        for (const item of spData) {
            total += item.TongTien;
        }
        return total;
    };

    useEffect(() => {
        const total = calculateTotal();
        setTotalTongTien(total);
    }, [spData]);

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0) {
            nhaphanphoiService.getNhaPhanPhoiAll({ page: Number(searchParams.get('page')) }).then((res) => {
                setNhaPhanPhois(res.data.data);
            });
        }
    }, []);

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0) {
            taikhoanService.getTaiKhoanAll({ page: Number(searchParams.get('page')) }).then((res) => {
                setTaiKhoans(res.data.data);
            });
        }
    }, []);

    const handleChange = (e) => {
        const target = e.target;

        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (formRef.current.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            // onSave(data);
            const hoaDonNhapData = {
                ...data,
                TongTien: totalTongTien,
            };
            const hoaDonNhapResponse = await hoadonnhapService.createHoaDonNhap(hoaDonNhapData);
            try {
                const maHoaDonNhap = hoaDonNhapResponse.data.data.id;

                spData.forEach(async (item) => {
                    const chiTietHoaDonData = {
                        MaHoaDonNhap: maHoaDonNhap,
                        MaSanPham: item.id,
                        SoLuongCTHDN: item.SoLuong,
                        GiaNhap: item.GiaNhap,
                        TongTienCTHDN: item.TongTien,
                    };
                    await chitiethoadonnhapService.createChiTietHoaDonNhap(chiTietHoaDonData);
                });

                localStorage.removeItem('hdn');

                toast.success('Thêm hóa đơn nhập thành công!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setTimeout(() => {
                    onClose();
                }, 3000);
            } catch (error) {
                console.error('Error creating order:', error);
                toast.error('Thêm hóa đơn nhập thất bại!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
            setData({
                id: 0,
                MaNhaPhanPhoi: '',
                MaTaiKhoan: '',
                KieuThanhToan: '',
                TongTien: '',
            });
            setValidated(false);
        }
    };

    useEffect(() => {
        // Lấy dữ liệu từ local storage 'hdn' khi component được render
        const hdnDataFromStorage = JSON.parse(localStorage.getItem('hdn')) || [];
        setSanPhamData(
            hdnDataFromStorage.map((item) => ({
                ...item,
                GiaNhap: item.GiaGiam * 0.7,
                TongTien: item.GiaGiam * 0.7 * item.SoLuong,
            })),
        );
    }, []);

    const updateLocalStorage = (updatedSpData) => {
        localStorage.setItem('hdn', JSON.stringify(updatedSpData));
        setSanPhamData(updatedSpData);
    };

    const handleDelete = (index, e) => {
        e.preventDefault();
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi hóa đơn nhập không?')) {
            const updatedSpData = [...spData];
            updatedSpData.splice(index, 1);
            updateLocalStorage(updatedSpData);
        }
    };

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <ToastContainer />
            <Modal.Header closeButton>
                <Modal.Title>Thêm hóa đơn nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nhà phân phối:</Form.Label>
                        <Form.Control
                            as="select"
                            value={data.MaNhaPhanPhoi}
                            name="MaNhaPhanPhoi"
                            required
                            autoFocus
                            onChange={handleChange}
                        >
                            <option value=""> - Chọn nhà phân phối - </option>
                            {nhaphanphos.rows.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.id} - {type.TenNhaPhanPhoi}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Vui lòng chọn nhà phân phối.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nhân viên:</Form.Label>
                        <Form.Control
                            as="select"
                            value={data.MaTaiKhoan}
                            name="MaTaiKhoan"
                            required
                            autoFocus
                            onChange={handleChange}
                        >
                            <option value=""> - Chọn nhân viên - </option>
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
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Vui lòng chọn nhân viên.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Kiểu thanh toán:</Form.Label>
                        <Form.Control
                            as="select"
                            value={data.KieuThanhToan}
                            name="KieuThanhToan"
                            required
                            autoFocus
                            onChange={handleChange}
                        >
                            <option value=""> - Chọn kiểu thanh toán - </option>
                            <option value="Thanh toán bằng tiền mặt">Thanh toán bằng tiền mặt</option>
                            <option value="Thanh toán bằng chuyển khoản">Thanh toán bằng chuyển khoản</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Vui lòng chọn kiểu thanh toán.</Form.Control.Feedback>
                    </Form.Group>
                    <div className="col-12 text-center" style={{ fontSize: '1.8rem' }}>
                        Thông tin sản phẩm
                    </div>
                    <Table striped bordered hover className="myTable">
                        <thead>
                            <tr className="text-center">
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Ảnh đại diện</th>
                                <th>Giá nhập</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spData.length > 0 ? (
                                spData.map((item, index) => {
                                    const firstUrl = getFirstImage(item.AnhDaiDien);

                                    return (
                                        <tr className="text-center" key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.TenSanPham}</td>
                                            <td>
                                                <img src={firstUrl} alt="Ảnh đại diện" style={{ maxWidth: '100px' }} />
                                            </td>
                                            <td>{numeral(item.GiaNhap).format('0,0')}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.SoLuong}
                                                    style={{ width: 50 }}
                                                    onChange={(e) => {
                                                        const newQuantity = parseInt(e.target.value);
                                                        if (!isNaN(newQuantity) && newQuantity >= 1) {
                                                            const updatedSpData = [...spData];
                                                            updatedSpData[index].SoLuong = newQuantity;
                                                            updatedSpData[index].TongTien =
                                                                item.GiaGiam * 0.7 * newQuantity;
                                                            updateLocalStorage(updatedSpData);
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td>{numeral(item.TongTien).format('0,0')}</td>
                                            <td>
                                                <button onClick={(e) => handleDelete(index, e)}>
                                                    <FontAwesomeIcon icon={faTrash} title="Xóa" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        Không có sản phẩm nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Link to={config.routes.sanpham_admin} className={cx('muasanphamkhac')}>
                        <FontAwesomeIcon icon={faArrowRight} />
                        Chọn thêm sản phẩm
                    </Link>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
                <Button type="submit" variant="primary" onClick={handleSave}>
                    Thêm mới
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateHDN;
