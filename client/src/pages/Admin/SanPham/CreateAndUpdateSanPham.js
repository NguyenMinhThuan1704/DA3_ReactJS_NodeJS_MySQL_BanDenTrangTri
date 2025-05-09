import { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { BsCameraFill } from 'react-icons/bs';
import { ImBin } from 'react-icons/im';
import Loading from '../../../components/Loading/Loading';
import Image from '../../../components/Image';
import loaispService from './../../../services/loaispService';
import sanphamService from './../../../services/sanphamService';

function CreateAndUpdateSanPham({ dataRaw, isShow, onSave, onClose }) {
    const formRef = useRef();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [loaisanphams, setLoaiSanPhams] = useState({ rows: [], count: 0 });

    // previewImage sẽ là mảng URL
    const [previewImage, setPreviewImage] = useState([]);

    // data.AnhDaiDien cũng luôn là mảng URL
    const [data, setData] = useState({
        id: 0,
        MaLoaiSanPham: '',
        TenSanPham: '',
        AnhDaiDien: [],
        Gia: '',
        GiaGiam: '',
        SoLuong: '',
    });

    // load danh sách loại sản phẩm
    useEffect(() => {
        const page = Number(searchParams.get('page'));
        if (page > 0) {
            loaispService.getCategoryAll({ page }).then((res) => {
                setLoaiSanPhams(res.data.data);
            });
        }
    }, [searchParams]);

    // khi dataRaw thay đổi, parse AnhDaiDien thành mảng
    useEffect(() => {
        if (dataRaw) {
            const existingImages = Array.isArray(dataRaw.AnhDaiDien)
                ? dataRaw.AnhDaiDien
                : dataRaw.AnhDaiDien
                ? JSON.parse(dataRaw.AnhDaiDien)
                : [];

            setData({
                id: dataRaw.id ?? 0,
                MaLoaiSanPham: dataRaw.MaLoaiSanPham ?? '',
                TenSanPham: dataRaw.TenSanPham ?? '',
                AnhDaiDien: existingImages,
                Gia: dataRaw.Gia ?? '',
                GiaGiam: dataRaw.GiaGiam ?? '',
                SoLuong: dataRaw.SoLuong ?? '',
            });
            setPreviewImage(existingImages);
        } else {
            // reset về mặc định
            setData({
                id: 0,
                MaLoaiSanPham: '',
                TenSanPham: '',
                AnhDaiDien: [],
                Gia: '',
                GiaGiam: '',
                SoLuong: '',
            });
            setPreviewImage([]);
        }
    }, [dataRaw]);

    // upload nhiều file lên Cloudinary, nối thêm vào cả preview và data.AnhDaiDien
    const handleFiles = async (e) => {
        e.stopPropagation();
        setIsLoading(true);
        const files = Array.from(e.target.files);
        const folder = 'ecommerce_decorative_lights';
        const uploaded = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESETS);
            formData.append('folder', folder);
            const resp = await sanphamService.apiUploadImages(formData);
            if (resp.status === 200 && resp.data.secure_url) {
                uploaded.push(resp.data.secure_url);
            }
        }

        setIsLoading(false);
        setPreviewImage((prev) => [...prev, ...uploaded]);
        setData((prev) => ({
            ...prev,
            AnhDaiDien: [...prev.AnhDaiDien, ...uploaded],
        }));
    };

    const handleDeleteImage = (url) => {
        setPreviewImage((prev) => prev.filter((u) => u !== url));
        setData((prev) => ({
            ...prev,
            AnhDaiDien: prev.AnhDaiDien.filter((u) => u !== url),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (formRef.current.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const payloadToSave = {
            ...data,
            AnhDaiDien: JSON.stringify(data.AnhDaiDien),
        };

        onSave(payloadToSave, dataRaw ? 'update' : 'create');

        // reset form
        setData({
            id: 0,
            MaLoaiSanPham: '',
            TenSanPham: '',
            AnhDaiDien: [],
            Gia: '',
            GiaGiam: '',
            SoLuong: '',
        });
        setPreviewImage([]);
        setValidated(false);
    };

    return (
        <Modal show={isShow} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{dataRaw ? 'Sửa thông tin sản phẩm' : 'Thêm sản phẩm'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    {/* Loại sản phẩm */}
                    <Form.Group className="mb-3">
                        <Form.Label>Loại sản phẩm:</Form.Label>
                        <Form.Control
                            as="select"
                            value={data.MaLoaiSanPham}
                            name="MaLoaiSanPham"
                            required
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

                    {/* Tên sản phẩm */}
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

                    {/* Hình ảnh */}
                    <div className="w-full mb-6">
                        <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
                        <div className="w-full">
                            <label
                                htmlFor="file"
                                className="w-full border-2 h-[200px] my-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
                            >
                                {isLoading ? (
                                    <Loading />
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <BsCameraFill size={50} color="blue" />
                                        Thêm ảnh
                                    </div>
                                )}
                            </label>
                            <input id="file" type="file" multiple hidden onChange={handleFiles} />
                            <div className="w-full">
                                <h3 className="font-medium py-4">Ảnh đã chọn</h3>
                                <div className="d-flex flex-wrap gap-4">
                                    {previewImage.map((url) => (
                                        <div
                                            key={url}
                                            className="relative border rounded-3xl shadow-md d-flex"
                                            style={{ width: '150px', height: '150px' }}
                                        >
                                            <Image src={url} alt="preview" className=" rounded-3xl w-100" />
                                            <span
                                                title="Xóa"
                                                onClick={() => handleDeleteImage(url)}
                                                className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                                            >
                                                <ImBin />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Giá */}
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

                    {/* Giá giảm */}
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

                    {/* Số lượng */}
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
