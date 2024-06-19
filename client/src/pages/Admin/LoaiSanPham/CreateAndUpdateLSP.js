import { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function CreateAndUpdateLSP({ dataRaw, isShow, onSave, onClose }) {

    const formRef = useRef();

    const [validated, setValidated] = useState(false);

    const [data, setData] = useState({
        id: dataRaw?.id ?? 0,
        TenLoaiSanPham: dataRaw?.TenLoaiSanPham ?? '',
        NoiDung: dataRaw?.NoiDung ?? '',
    });

    useEffect(() => {
        setData({
            id: dataRaw?.id ?? 0,
            TenLoaiSanPham: dataRaw?.TenLoaiSanPham ?? '',
            NoiDung: dataRaw?.NoiDung ?? '',
        });
    }, [dataRaw]);

    const handleChange = (e) => {
        const target = e.target;

        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (formRef.current.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            if (dataRaw) {
                onSave(data, 'update');
                setData({
                    id: 0,
                    TenLoaiSanPham: '',
                    NoiDung: '',
                });
                setValidated(false);
            } else {
                onSave(data, 'create');
                setData({
                    id: 0,
                    TenLoaiSanPham: '',
                    NoiDung: '',
                });
                setValidated(false);
            }
        }
    };

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{dataRaw ? 'Sửa thông tin loại sản phẩm' : 'Thêm loại sản phẩm'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên loại sản phẩm:</Form.Label>
                        <Form.Control
                            value={data.TenLoaiSanPham}
                            name="TenLoaiSanPham"
                            type="text"
                            placeholder="Nhập tên loại sản phẩm"
                            autoFocus
                            required
                            onChange={handleChange}
                            
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập tên loại sản phẩm.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nội dung:</Form.Label>
                        <Form.Control
                            value={data.NoiDung}
                            name="NoiDung"
                            type="text"
                            placeholder="Nhập nội dung"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập nội dung.</Form.Control.Feedback>
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

export default CreateAndUpdateLSP;