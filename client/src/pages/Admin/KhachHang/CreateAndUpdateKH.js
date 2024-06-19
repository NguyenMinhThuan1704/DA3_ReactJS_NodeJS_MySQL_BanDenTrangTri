import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import taikhoanService from './../../../services/taikhoanService'

function CreateAndUpdateKH({ dataRaw, isShow, onSave, onClose }) {

    const formRef = useRef();

    const [validated, setValidated] = useState(false);

    const [searchParams] = useSearchParams();

    const [taikhoans, setTaiKhoans] = useState({ rows: [], count: 0 });

    const [data, setData] = useState({
        id: dataRaw?.id ?? 0,
        MaTaiKhoan: dataRaw?.MaTaiKhoan ?? '',
        TenKH: dataRaw?.TenKH ?? '',
        DiaChi: dataRaw?.DiaChi ?? '',
        SoDienThoai: dataRaw?.SoDienThoai ?? '',
        Email: dataRaw?.Email ?? '',
    });

    useEffect(() => {
        setData({
            id: dataRaw?.id ?? 0,
            MaTaiKhoan: dataRaw?.MaTaiKhoan ?? '',
            TenKH: dataRaw?.TenKH ?? '',
            DiaChi: dataRaw?.DiaChi ?? '',
            SoDienThoai: dataRaw?.SoDienThoai ?? '',
            Email: dataRaw?.Email ?? '',
        });
    }, [dataRaw]);

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0) {
            taikhoanService.getTaiKhoan({ page: Number(searchParams.get('page')) }).then((res) => {
                setTaiKhoans(res.data.data);
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    MaTaiKhoan: '',
                    TenKH: '',
                    DiaChi: '',
                    SoDienThoai: '',
                    Email: '',
                });
                setValidated(false);
            } else {
                onSave(data, 'create');
                setData({
                    id: 0,
                    MaTaiKhoan: '',
                    TenKH: '',
                    DiaChi: '',
                    SoDienThoai: '',
                    Email: '',
                });
                setValidated(false);
            }
        }
    };

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{dataRaw ? 'Sửa thông tin khách hàng' : 'Thêm khách hàng'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tài khoản:</Form.Label>
                        <Form.Control
                        as="select"
                        value={data.MaTaiKhoan}
                        name="MaTaiKhoan"
                        required
                        onChange={handleChange}
                        >
                        <option value=""> - Chọn tài khoản - </option>
                        {taikhoans.rows.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.TaiKhoan}
                            </option>
                        ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Vui lòng chọn tài khoản.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên khách hàng:</Form.Label>
                        <Form.Control
                            value={data.TenKH}
                            name="TenKH"
                            type="text"
                            placeholder="Nhập tên khách hàng"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập tên khách hàng.</Form.Control.Feedback>
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

export default CreateAndUpdateKH;