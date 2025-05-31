import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import imageAnalyzeService from './../../../../../services/aiService';

const COLOR_VI_MAP = {
    gray: 'xám',
    black: 'đen',
    white: 'trắng',
    gainsboro: 'xám nhạt',
    dimgray: 'xám đậm',
    darkslategray: 'xám xanh đậm',
    sienna: 'nâu đất',
    burlywood: 'vàng đất',
    silver: 'bạc',
    gold: 'vàng',
    yellow: 'vàng tươi',
    brown: 'nâu',
    green: 'xanh lá',
    red: 'đỏ',
    blue: 'xanh dương',
    orange: 'cam',
    purple: 'tím',
    pink: 'hồng',
    rosybrown: 'nâu hồng',
    antiquewhite: 'trắng cổ điển',
    saddlebrown: 'nâu yên ngựa',
    navajowhite: 'vàng kem nhạt',
};

const ROOM_VI_MAP = {
    'living room': 'Phòng khách',
    bedroom: 'Phòng ngủ',
    ceiling: 'Trần nhà',
    wall: 'Tường',
    outdoor: 'Ngoài trời',
    kitchen: 'Phòng bếp',
    bathroom: 'Phòng tắm',
    'dining room': 'Phòng ăn',
};

const STYLE_VI_MAP = {
    Modern: 'Hiện đại',
    Classic: 'Cổ điển',
    Traditional: 'Truyền thống',
    Minimalist: 'Tối giản',
    Scandinavian: 'Bắc Âu',
    Industrial: 'Công nghiệp',
    Contemporary: 'Đương đại',
    Vintage: 'Cổ điển',
};

const SIZE_VI_MAP = {
    small: 'Nhỏ',
    medium: 'Trung bình',
    large: 'Lớn',
};

function SupportAIModal({ isShow, onClose }) {
    const formRef = useRef();
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFiles([...e.target.files]);
        setResult(null);
        setError(null);
    };

    const handleAnalyzeClick = async () => {
        if (!selectedFiles.length) {
            setError('Vui lòng chọn ít nhất 1 ảnh!');
            return;
        }
        setLoading(true);
        setResult(null);
        setError(null);
        try {
            const res = await imageAnalyzeService.aiAnalyzeImages(selectedFiles);
            setResult(res);
        } catch (err) {
            setError('Có lỗi khi phân tích ảnh!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>AI phân tích hình ảnh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Chọn ảnh bạn muốn phân tích:</Form.Label>
                        <Form.Control name="image" type="file" multiple required onChange={handleFileChange} />
                        <Form.Control.Feedback type="invalid">Vui chọn ảnh bạn muốn phân tích.</Form.Control.Feedback>
                    </Form.Group>
                    {loading && (
                        <div className="mb-3">
                            <Spinner animation="border" />
                            <span className="ms-2">Đang phân tích...</span>
                        </div>
                    )}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {result && (
                        <div className="mt-3">
                            <Alert variant="success">Phân tích thành công!</Alert>
                            {result.features.map((f, idx) => (
                                <div key={idx} className="mb-4">
                                    <div>
                                        <b>Phòng của bạn:</b>
                                        <ul>
                                            <li>
                                                Phong cách: <b>{STYLE_VI_MAP[f.style] || f.style}</b>
                                            </li>
                                            <li>
                                                Loại phòng: <b>{ROOM_VI_MAP[f.roomType] || f.roomType}</b>
                                            </li>
                                            <li>
                                                Kích thước: <b>{SIZE_VI_MAP[f.sizeCategory] || f.sizeCategory}</b>
                                            </li>
                                            <li>
                                                Màu chủ đạo:{' '}
                                                <b>
                                                    {f.dominantColors &&
                                                        f.dominantColors.map((m) => COLOR_VI_MAP[m] || m).join(', ')}
                                                </b>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <b>Sản phẩm gợi ý phù hợp:</b>
                                        <div
                                            style={{
                                                maxHeight: 250,
                                                overflowY: 'auto',
                                            }}
                                        >
                                            <table className="table table-bordered table-striped mt-2">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tên sản phẩm</th>
                                                        <th>Ảnh đại diện</th>
                                                        <th>Giá bán</th>
                                                        <th>Giá giảm</th>
                                                        <th>Màu sắc</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(f.matchedProducts || []).map((sp, idx) => (
                                                        <tr
                                                            key={sp.id}
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => {
                                                                const id = sp.productInfo?.id || sp.MaSanPham;
                                                                if (id) navigate(`/user/sanpham/${id}`);
                                                            }}
                                                        >
                                                            <td>{idx + 1}</td>
                                                            <td>{sp.productInfo?.TenSanPham}</td>
                                                            <td>
                                                                {sp.productInfo?.AnhDaiDien && (
                                                                    <img
                                                                        src={JSON.parse(sp.productInfo.AnhDaiDien)[0]}
                                                                        alt="Ảnh"
                                                                        width={60}
                                                                        style={{
                                                                            objectFit: 'cover',
                                                                            borderRadius: 8,
                                                                        }}
                                                                    />
                                                                )}
                                                            </td>
                                                            <td>
                                                                {sp.productInfo?.Gia
                                                                    ? sp.productInfo.Gia.toLocaleString() + 'đ'
                                                                    : ''}
                                                            </td>
                                                            <td>
                                                                {sp.productInfo?.GiaGiam
                                                                    ? sp.productInfo.GiaGiam.toLocaleString() + 'đ'
                                                                    : ''}
                                                            </td>
                                                            <td>
                                                                {Array.isArray(JSON.parse(sp.DominantColors))
                                                                    ? JSON.parse(sp.DominantColors)
                                                                          .map((m) => COLOR_VI_MAP[m] || m)
                                                                          .join(', ')
                                                                    : ''}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {(!f.matchedProducts || f.matchedProducts.length === 0) && (
                                                        <tr>
                                                            <td colSpan={6} className="text-center text-secondary">
                                                                Không có sản phẩm phù hợp!
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
                <Button variant="primary" disabled={loading} onClick={handleAnalyzeClick}>
                    Phân tích
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SupportAIModal;
