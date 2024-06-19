import { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function CreateAndUpdateNPP({ dataRaw, isShow, onSave, onClose }) {

    const formRef = useRef();

    const [validated, setValidated] = useState(false);

    const [data, setData] = useState({
        id: dataRaw?.id ?? 0,
        TenNhaPhanPhoi: dataRaw?.TenNhaPhanPhoi ?? '',
        DiaChi: dataRaw?.DiaChi ?? '',
        SoDienThoai: dataRaw?.SoDienThoai ?? '',
        MoTa: dataRaw?.MoTa ?? '',
    });

    useEffect(() => {
        setData({
            id: dataRaw?.id ?? 0,
            TenNhaPhanPhoi: dataRaw?.TenNhaPhanPhoi ?? '',
            DiaChi: dataRaw?.DiaChi ?? '',
            SoDienThoai: dataRaw?.SoDienThoai ?? '',
            MoTa: dataRaw?.MoTa ?? '',
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
                    TenNhaPhanPhoi: '',
                    DiaChi: '',
                    SoDienThoai: '',
                    MoTa: '',
                });
                setValidated(false);
            } else {
                onSave(data, 'create');
                setData({
                    id: 0,
                    TenNhaPhanPhoi: '',
                    DiaChi: '',
                    SoDienThoai: '',
                    MoTa: '',
                });
                setValidated(false);
            }
        }
    };

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{dataRaw ? 'Sửa thông tin nhà cung cấp' : 'Thêm nhà cung cấp'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên nhà cung cấp:</Form.Label>
                        <Form.Control
                            value={data.TenNhaPhanPhoi}
                            name="TenNhaPhanPhoi"
                            type="text"
                            placeholder="Nhập tiêu đề dự án thực hiện"
                            autoFocus
                            required
                            onChange={handleChange}
                            
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập tiêu đề dự án thực hiện.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ:</Form.Label>
                        <Form.Control
                            value={data.DiaChi}
                            name="DiaChi"
                            type="text"
                            placeholder="Nhập địa chỉ"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập địa chỉ.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại:</Form.Label>
                        <Form.Control
                            value={data.SoDienThoai}
                            name="SoDienThoai"
                            type="text"
                            placeholder="Nhập số điện thoại"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập số điện thoại.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả:</Form.Label>
                        <Form.Control
                            value={data.MoTa}
                            name="MoTa"
                            type="text"
                            placeholder="Nhập mô tả"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập mô tả.</Form.Control.Feedback>
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

export default CreateAndUpdateNPP;