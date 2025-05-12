import { useEffect, useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import chitiethoadonbanService from '../../../services/chitiethoadonbanService';
import sanphamService from '../../../services/sanphamService';
import { getFirstImage } from '../../getFirstImage';
function DetailHDB({ dataRaw, isShow, onClose }) {
    const [chiTietHoaDons, setChiTietHoaDons] = useState([]);
    const [sanPhams, setSanPhams] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        if (dataRaw) {
            chitiethoadonbanService
                .getChiTietHoaDonBanByMaHD1(dataRaw.id)
                .then((response) => {
                    setChiTietHoaDons(response.data.data);
                    const maSanPhams = response.data.data.map((item) => item.MaSanPham);
                    return Promise.all(maSanPhams.map((maSanPham) => sanphamService.getSanPhamById(maSanPham)));
                })
                .then((products) => {
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
                                    combinedData.map((item, index) => {
                                        const firstUrl = getFirstImage(item.AnhDaiDien);
                                        return (
                                            <tr className="text-center" key={item.MaChiTietHoaDon}>
                                                <td>{index + 1}</td>
                                                <td>{item.TenSanPham}</td>
                                                <td>
                                                    <img
                                                        src={firstUrl}
                                                        alt="Ảnh đại diện"
                                                        style={{ maxWidth: '100px' }}
                                                    />
                                                </td>
                                                <td>{new Intl.NumberFormat().format(item.GiaCTHDB)}</td>
                                                <td>{item.SoLuongCTHDB}</td>
                                                <td>{new Intl.NumberFormat().format(item.TongGia)}</td>
                                            </tr>
                                        );
                                    })
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
                        Thông tin khách hàng
                    </div>
                    <div className="col-12 mb-2">
                        <Form.Group>
                            <Form.Label>Tên khách hàng:</Form.Label>
                            <Form.Control type="text" value={dataRaw?.TenKH || ''} disabled />
                        </Form.Group>
                    </div>
                    <div className="col-12 mb-2">
                        <Form.Group>
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control type="text" value={dataRaw?.DiaChi || ''} disabled />
                        </Form.Group>
                    </div>
                    <div className="col-12 mb-2">
                        <Form.Group>
                            <Form.Label>Số điện thoại:</Form.Label>
                            <Form.Control type="tel" value={dataRaw?.SoDienThoai || ''} disabled />
                        </Form.Group>
                    </div>
                    <div className="col-12 mb-2">
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" value={dataRaw?.Email || ''} disabled />
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
