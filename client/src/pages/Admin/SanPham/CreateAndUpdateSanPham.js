import { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import loaispService from './../../../services/loaispService';

function CreateAndUpdateSanPham({ dataRaw, isShow, onSave, onClose }) {
    const formRef = useRef();

    const [validated, setValidated] = useState(false);

    const [searchParams] = useSearchParams();

    const [loaisanphams, setLoaiSanPhams] = useState({ rows: [], count: 0 });

    const [previewImage, setPreviewImage] = useState('');

    const [data, setData] = useState({
        id: 0,
        MaLoaiSanPham: '',
        TenSanPham: '',
        AnhDaiDien: '',
        Gia: '',
        GiaGiam: '',
        SoLuong: '',
    });

    useEffect(() => {
        if (dataRaw) {
            setData({
                id: dataRaw?.id ?? 0,
                MaLoaiSanPham: dataRaw?.MaLoaiSanPham ?? '',
                TenSanPham: dataRaw?.TenSanPham ?? '',
                AnhDaiDien: dataRaw?.AnhDaiDien ?? '',
                Gia: dataRaw?.Gia ?? '',
                GiaGiam: dataRaw?.GiaGiam ?? '',
                SoLuong: dataRaw?.SoLuong ?? '',
            });
            setPreviewImage(dataRaw.AnhDaiDien ?? '');
        } else {
            setData({
                id: 0,
                MaLoaiSanPham: '',
                TenSanPham: '',
                AnhDaiDien: '',
                Gia: '',
                GiaGiam: '',
                SoLuong: '',
            });
            setPreviewImage('');
        }
    }, [dataRaw]);

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0) {
            loaispService.getCategoryAll({ page: Number(searchParams.get('page')) }).then((res) => {
                setLoaiSanPhams(res.data.data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        const target = e.target;
        const { name, value, files } = target;

        if (name.startsWith('sanpham') && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const filePath = `./../../assets/img/Product/${file.name}`;
                setPreviewImage(e.target.result);
                setData((prev) => ({ ...prev, AnhDaiDien: filePath }));
            };
            reader.readAsDataURL(file);
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (formRef.current.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            onSave(data, dataRaw ? 'update' : 'create');
            setData({
                id: 0,
                MaLoaiSanPham: '',
                TenSanPham: '',
                AnhDaiDien: '',
                Gia: '',
                GiaGiam: '',
                SoLuong: '',
            });
            setPreviewImage('');
            setValidated(false);
        }
    };

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{dataRaw ? 'Sửa thông tin sản phẩm' : 'Thêm sản phẩm'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại sản phẩm:</Form.Label>
                        <Form.Control
                            as="select"
                            value={data.MaLoaiSanPham}
                            name="MaLoaiSanPham"
                            required
                            autoFocus
                            onChange={handleChange}
                        >
                            <option value=""> - Chọn loại sản phẩm - </option>
                            {loaisanphams.rows.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.TenLoaiSanPham}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Vui lòng chọn loại sản phẩm.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên sản phẩm:</Form.Label>
                        <Form.Control
                            value={data.TenSanPham}
                            name="TenSanPham"
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập tên sản phẩm.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh đại diện:</Form.Label>
                        <Form.Control
                            name={`sanpham${data.id}` || ''}
                            type="file"
                            placeholder="Chọn ảnh đại diện"
                            required={!dataRaw}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng chọn ảnh đại diện.</Form.Control.Feedback>
                        {(data.AnhDaiDien || previewImage) && (
                            <img
                                id="previewImage"
                                src={previewImage || data.AnhDaiDien}
                                alt="Preview"
                                style={{ display: 'block', marginTop: '10px', maxWidth: 200 }}
                            />
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá:</Form.Label>
                        <Form.Control
                            value={data.Gia}
                            name="Gia"
                            type="text"
                            placeholder="Nhập giá"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập giá.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá giảm:</Form.Label>
                        <Form.Control
                            value={data.GiaGiam}
                            name="GiaGiam"
                            type="text"
                            placeholder="Nhập giá giảm"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập giá giảm.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số lượng:</Form.Label>
                        <Form.Control
                            value={data.SoLuong}
                            name="SoLuong"
                            type="text"
                            placeholder="Nhập số lượng"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập số lượng.</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
                <Button type="submit" variant="primary" onClick={handleSave}>
                    {dataRaw ? 'Cập nhật' : 'Thêm mới'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateAndUpdateSanPham;
