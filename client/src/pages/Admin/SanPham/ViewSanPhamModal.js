import Modal from 'react-bootstrap/Modal';
import numeral from 'numeral';
import classNames from 'classnames/bind';
import styles from './SanPham.module.scss';
import PaginationSimple from '../../../components/PaginationSimple';
const cx = classNames.bind(styles);
function ViewSanPhamModal({ show, onHide, sanPham, danhgias, page, pageSize, total, onPageChange }) {
    if (!sanPham) return null;

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Thông tin sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12, textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                        <div style={{ minWidth: 120, fontWeight: 'bold' }}>Tên sản phẩm:</div>
                        <div>{sanPham.TenSanPham}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                        <div style={{ minWidth: 120, fontWeight: 'bold' }}>Loại sản phẩm:</div>
                        <div>{sanPham.TenLoaiSanPham}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                        <div style={{ minWidth: 120, fontWeight: 'bold' }}>Giá:</div>
                        <div>{numeral(sanPham.Gia).format('0,0')}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                        <div style={{ minWidth: 120, fontWeight: 'bold' }}>Ảnh đại diện:</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {(Array.isArray(sanPham.AnhDaiDien)
                                ? sanPham.AnhDaiDien
                                : JSON.parse(sanPham.AnhDaiDien || '[]')
                            ).map((img, idx) => (
                                <img key={idx} src={img} alt="img" style={{ width: 150, borderRadius: 8 }} />
                            ))}
                        </div>
                    </div>
                </div>

                <hr />
                <div>
                    <b>Đánh giá sản phẩm:</b>
                    <table style={{ width: '100%', marginTop: 12 }}>
                        <thead>
                            <tr>
                                <th>Khách hàng</th>
                                <th>Nội dung</th>
                                <th>Số sao</th>
                                <th>Ngày</th>
                            </tr>
                        </thead>
                        <tbody>
                            {danhgias.rows.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>
                                        Chưa có đánh giá
                                    </td>
                                </tr>
                            ) : (
                                danhgias.rows.map((dg, idx) => (
                                    <tr key={idx}>
                                        <td>{dg.MaKhachHang || 'Ẩn danh'}</td>
                                        <td>{dg.MoTa}</td>
                                        <td>{dg.SoSao} ★</td>
                                        <td>{dg.createdAt ? new Date(dg.createdAt).toLocaleString() : ''}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className={cx('d-flex', 'justify-content-center', 'mt-5')}>
                        <div className={cx('box-sum')}>
                            <div className={cx('box-right')}>
                                <PaginationSimple
                                    total={total}
                                    pageSize={pageSize}
                                    page={page}
                                    onPageChange={onPageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>
                    Đóng
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewSanPhamModal;
