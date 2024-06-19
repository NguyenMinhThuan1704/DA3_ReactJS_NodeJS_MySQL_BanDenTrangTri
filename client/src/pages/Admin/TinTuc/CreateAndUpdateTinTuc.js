import { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function CreateAndUpdateTinTuc({ dataRaw, isShow, onSave, onClose }) {

    const formRef = useRef();

    const [validated, setValidated] = useState(false);

    const [previewImage, setPreviewImage] = useState('');

    const [data, setData] = useState({
        id: 0,
        TieuDe: '',
        AnhDaiDien: '',
        MoTa: '',
    });

    useEffect(() => {
        if (dataRaw) {
            setData({
                id: dataRaw.id ?? 0,
                TieuDe: dataRaw.TieuDe ?? '',
                AnhDaiDien: dataRaw.AnhDaiDien ?? '',
                MoTa: dataRaw.MoTa ?? '',
            });
            setPreviewImage(dataRaw.AnhDaiDien ?? '');
        } else {
            setData({
                id: 0,
                TieuDe: '',
                AnhDaiDien: '',
                MoTa: '',
            });
            setPreviewImage('');
        }
    }, [dataRaw]);

    const handleChange = (e) => {
        const target = e.target;
        const { name, value, files } = target;

        if (name.startsWith('tintuc') && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const filePath = `./../../assets/img/TinTuc/${file.name}`;
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
                TieuDe: '',
                AnhDaiDien: '',
                MoTa: '',
            });
            setPreviewImage('');
            setValidated(false);
        }
    };

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{dataRaw ? 'Sửa thông tin tin tức' : 'Thêm tin tức'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề tin tức:</Form.Label>
                        <Form.Control
                            value={data.TieuDe}
                            name="TieuDe"
                            type="text"
                            placeholder="Nhập tiêu đề tin tức"
                            autoFocus
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập tiêu đề tin tức.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh đại diện:</Form.Label>
                        <Form.Control
                            name={`tintuc${data.id}` || ''}
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

export default CreateAndUpdateTinTuc;
