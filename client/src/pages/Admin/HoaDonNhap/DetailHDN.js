import { useEffect, useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import chitiethoadonnhapService from '../../../services/chitiethoadonnhapService';
import sanphamService from '../../../services/sanphamService';
import numeral from 'numeral';

function DetailHDB({ dataRaw, isShow, onClose }) {
    const [chiTietHoaDons, setChiTietHoaDons] = useState([]);
    const [sanPhams, setSanPhams] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        if (dataRaw) {
            console.log(dataRaw.id);
            chitiethoadonnhapService
                .getChiTietHoaDonNhapByMaHD1(dataRaw.id)
                .then((response) => {
                    console.log(response);
                    setChiTietHoaDons(response.data.data);
                    const maSanPhams = response.data.data.map((item) => item.MaSanPham);
                    return Promise.all(maSanPhams.map((maSanPham) => sanphamService.getSanPhamById(maSanPham)));
                })
                .then((products) => {
                    console.log(products);
                    setSanPhams(products.map((product) => product.data.data));
                })
                .catch((error) => {
                    console.error('Failed to fetch data', error);
                });
        }
    }, [dataRaw]);

    useEffect(() => {
        const combined = chiTietHoaDons.map((chiTiet) => {
            const sanPham = sanPhams.find((sp) => sp.id === chiTiet.MaSanPham);
            return { ...chiTiet, ...sanPham };
        });
        setCombinedData(combined);
    }, [chiTietHoaDons, sanPhams]);

    console.log(combinedData);

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết hóa đơn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row mb-4">
                    <div className="col-12 text-center" style={{ fontSize: '1.8rem' }}>
                        Thông tin sản phẩm
                    </div>
                    <div className="col-12">
                        <Table striped bordered hover className="myTable">
                            <thead>
                                <tr className="text-center">
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Ảnh đại diện</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {combinedData.length > 0 ? (
                                    combinedData.map((item, index) => (
                                        <tr className="text-center" key={item.MaChiTietHoaDon}>
                                            <td>{index + 1}</td>
                                            <td>{item.TenSanPham}</td>
                                            <td>
                                                <img
                                                    src={item.AnhDaiDien}
                                                    alt="Ảnh đại diện"
                                                    style={{ maxWidth: '100px' }}
                                                />
                                            </td>
                                            <td>{numeral(item.GiaNhap).format('0,0')}</td>
                                            <td>{item.SoLuongCTHDN}</td>
                                            <td>{numeral(item.TongTienCTHDN).format('0,0')}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            Không có sản phẩm nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center" style={{ fontSize: '1.8rem' }}>
                        Thông tin hóa đơn
                    </div>
                    <div className="col-12 mb-2">
                        <Form.Group>
                            <Form.Label>Nhà phân phối:</Form.Label>
                            <Form.Control type="text" value={dataRaw?.TenNhaPhanPhoi || ''} disabled />
                        </Form.Group>
                    </div>
                    <div className="col-12 mb-2">
                        <Form.Group>
                            <Form.Label>Nhân viên nhập:</Form.Label>
                            <Form.Control type="text" value={dataRaw?.TaiKhoan || ''} disabled />
                        </Form.Group>
                    </div>
                    <div className="col-12 mb-2">
                        <Form.Group>
                            <Form.Label>Kiểu thanh toán:</Form.Label>
                            <Form.Control type="text" value={dataRaw?.KieuThanhToan || ''} disabled />
                        </Form.Group>
                    </div>
                    <div className="col-12 mb-2">
                        <Form.Group>
                            <Form.Label>Tổng tiền:</Form.Label>
                            <Form.Control type="text" value={numeral(dataRaw?.TongTien).format('0,0')} disabled />
                        </Form.Group>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DetailHDB;
