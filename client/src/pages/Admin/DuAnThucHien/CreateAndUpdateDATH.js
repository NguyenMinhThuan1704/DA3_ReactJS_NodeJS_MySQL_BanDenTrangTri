import { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function CreateAndUpdateDATH({ dataRaw, isShow, onSave, onClose }) {

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

        if (name.startsWith('duanthuchien') && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const filePath = `./../../assets/img/DuAnThucHien/${file.name}`;
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
                <Modal.Title>{dataRaw ? 'Sửa thông tin dự án thực hiện' : 'Thêm dự án thực hiện'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề dự án thực hiện:</Form.Label>
                        <Form.Control
                            value={data.TieuDe}
                            name="TieuDe"
                            type="text"
                            placeholder="Nhập tiêu đề dự án thực hiện"
                            autoFocus
                            required
                            onChange={handleChange}
                            
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập tiêu đề dự án thực hiện.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh đại diện:</Form.Label>
                        <Form.Control
                            name={`duanthuchien${data.id}` || ''}
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

export default CreateAndUpdateDATH;