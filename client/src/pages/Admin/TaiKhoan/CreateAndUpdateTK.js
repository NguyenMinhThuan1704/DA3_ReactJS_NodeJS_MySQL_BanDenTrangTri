import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import loaitaikhoanService from './../../../services/loaitaikhoanService';

function CreateAndUpdateTK({ dataRaw, isShow, onSave, onClose }) {
    const formRef = useRef();

    const [validated, setValidated] = useState(false);

    const [searchParams] = useSearchParams();

    const [loaitaikhoans, setLoaiTaiKhoans] = useState({ rows: [], count: 0 });

    const [data, setData] = useState({
        id: dataRaw?.id ?? 0,
        MaLoaiTK: dataRaw?.MaLoaiTK ?? '',
        TaiKhoan: dataRaw?.TaiKhoan ?? '',
        MatKhau: dataRaw?.MatKhau ?? '',
        Email: dataRaw?.Email ?? '',
    });

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0) {
            loaitaikhoanService.getLoaiTaiKhoan({ page: Number(searchParams.get('page')) }).then((res) => {
                setLoaiTaiKhoans(res.data.data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setData({
            id: dataRaw?.id ?? 0,
            MaLoaiTK: dataRaw?.MaLoaiTK ?? '',
            TaiKhoan: dataRaw?.TaiKhoan ?? '',
            MatKhau: dataRaw?.MatKhau ?? '',
            Email: dataRaw?.Email ?? '',
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
                    MaLoaiTK: '',
                    TaiKhoan: '',
                    MatKhau: '',
                    Email: '',
                });
                setValidated(false);
            } else {
                onSave(data, 'create');
                setData({
                    id: 0,
                    MaLoaiTK: '',
                    TaiKhoan: '',
                    MatKhau: '',
                    Email: '',
                });
                setValidated(false);
            }
        }
    };

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{dataRaw ? 'Sửa thông tin tài khoản' : 'Thêm tài khoản'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại tài khoản:</Form.Label>
                        <Form.Control
                            as="select"
                            value={data.MaLoaiTK}
                            name="MaLoaiTK"
                            required
                            onChange={handleChange}
                        >
                            <option value="">Chọn loại tài khoản</option>
                            {loaitaikhoans.rows.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.TenLoaiTK}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Vui lòng chọn loại tài khoản.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tài khoản:</Form.Label>
                        <Form.Control
                            value={data.TaiKhoan}
                            name="TaiKhoan"
                            type="text"
                            placeholder="Nhập tài khoản"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập tài khoản.</Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu:</Form.Label>
                        <Form.Control
                            value={data.MatKhau}
                            name="MatKhau"
                            type="text"
                            placeholder="Nhập mật khẩu"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập mật khẩu.</Form.Control.Feedback>
                    </Form.Group> */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            value={data.Email}
                            name="Email"
                            type="text"
                            placeholder="Nhập email"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập email.</Form.Control.Feedback>
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

export default CreateAndUpdateTK;
