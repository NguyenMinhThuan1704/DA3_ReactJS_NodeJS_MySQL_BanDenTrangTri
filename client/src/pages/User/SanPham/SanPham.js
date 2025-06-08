/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SanPham.module.scss';
import NewProduct from '../Home/NewProduct';
import cartService from '../../../services/cartService';
import Pagination from '../../../components/Pagination/Pagination';
import config from '~/config';
import sanphamService from '../../../services/sanphamService';
import { getFirstImage } from '../../getFirstImage';

const cx = classNames.bind(styles);

function SanPham() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [getID, setGetID] = useState({});
    const [getCateID, setGetCateID] = useState({ rows: [], count: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        sanphamService.getSanPhamById(id).then((res) => {
            setGetID(res.data.data);
        });
    }, [id]);

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0 && getID.MaLoaiSanPham) {
            sanphamService
                .getSanPhamByCate({ page: Number(searchParams.get('page')), MaLoaiSanPham: getID.MaLoaiSanPham })
                .then((res) => {
                    setGetCateID(res.data.data);
                });
        }
    }, [searchParams, getID.MaLoaiSanPham]);

    useEffect(() => {
        if (!searchParams.get('page')) {
            setSearchParams({ page: 1 });
        }
    }, [searchParams, setSearchParams]);

    const handleBuyNow = async () => {
        const taikhoan = JSON.parse(localStorage.getItem('userinfo'));
        if (!taikhoan) {
            toast.warning('Bạn cần đăng nhập trước khi đặt hàng!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setTimeout(() => {
                navigate(config.routes.login);
            }, 2000);
            return;
        }

        const data = {
            MaSanPham: id,
            MaTaiKhoan: taikhoan.id,
            SoLuong: quantity,
        };

        try {
            await cartService.createCart(data);
            toast.success('Thêm sản phẩm vào giỏ hàng thành công!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } catch (error) {
            toast.error('Thêm sản phẩm vào giỏ hàng thất bại!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1) {
            setQuantity(value);
        } else {
            setQuantity(1);
        }
    };

    const formatCurrency = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const newImg = getFirstImage(getID.AnhDaiDien);

    return (
        <div className={cx('container', 'grid', 'wide')}>
            <ToastContainer />
            <div className={cx('new_title')}>
                <ul className={cx('breadcrumb', 'title-h2')}>
                    <li className={cx('breadcrumb-item')}>
                        <a href="/" title="Trang chủ">
                            Trang chủ
                        </a>
                    </li>
                    <li className={cx('breadcrumb-item')}>
                        <a href="" title="Đèn chùm">
                            Đèn chùm
                        </a>
                    </li>
                    <li className={cx('breadcrumb-item')}>
                        <a href="" title="Đèn Chùm Hiện Đại">
                            Đèn Chùm Hiện Đại
                        </a>
                    </li>
                </ul>
            </div>

            <div className={cx('row', 'grid', 'wide')} style={{ marginTop: '16px', backgroundColor: '#fff' }}>
                <div className={cx('col', 'c-5')}>
                    <div className={cx('frame_img')}>
                        <div className={cx('img_wrapper')}>
                            <img src={newImg} alt="" className={cx('img')} />
                        </div>
                    </div>
                </div>

                <div className={cx('col', 'c-7', 'tomtat')}>
                    <h1 className={cx('name_product')}>{getID.TenSanPham}</h1>

                    <div className={cx('divauthor')}>
                        <b>Mã sản phẩm : {getID.id}</b>
                    </div>

                    <div className={cx('divauthor', 'other-price')}>
                        <b>Giá bán : </b>
                        <span className={cx('current', 'gia_giam')}>{formatCurrency(getID.GiaGiam || 0)}</span>
                        <span className={cx('current')} style={{ marginLeft: '10px' }}></span>
                        <del className={cx('gia')}>{formatCurrency(getID.Gia || 0)}</del>
                    </div>

                    <div className={cx('divauthor', 'description')}>
                        <ul>
                            <li>
                                <span>
                                    <span style={{ fontSize: '14px' }}>
                                        <strong>Kích thước:</strong>&nbsp; Ø900 x H500mm + 300
                                    </span>
                                </span>
                            </li>
                            <li>
                                <p>
                                    <span>
                                        <span style={{ fontSize: '14px' }}>
                                            <strong>Bóng đèn:</strong>
                                        </span>
                                    </span>
                                    <span style={{ fontSize: '14px' }}> Led 3 chế độ ánh sáng</span>
                                </p>
                            </li>
                            <li>
                                <span>
                                    <span style={{ fontSize: '14px' }}>
                                        <strong>Xuất sứ:</strong>&nbsp; Nhập khẩu
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span style={{ fontSize: '14px' }}>
                                        <strong>Bảo hành:</strong>&nbsp; 12 tháng
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('divauthor')} style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="number"
                            name="quantity"
                            className={cx('input_quantity')}
                            style={{ width: '100px', textAlign: 'center' }}
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <button onClick={handleBuyNow} className={cx('btn', 'btn-primary')}>
                            Thêm vào giỏ hàng
                        </button>
                    </div>

                    <div className={cx('divauthor', 'even')}>
                        <p>
                            <span>
                                <span>- Sản phẩm chưa bao gồm thuế VAT, chi phí lắp đặt.</span>
                            </span>
                        </p>
                        <p>
                            <span>
                                <span>
                                    - Sản phẩm xuất giao đều có phiếu bán hàng đi kèm, khách hàng không nhận được vui
                                    lòng liên hệ số điện thoại 028.22458144.
                                </span>
                            </span>
                        </p>
                        <p>
                            <span>
                                <span>- Địa điểm bảo hành sản phẩm: 8 Tân Khai, Phường 4, Quận Tân Bình, Tp. HCM</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={cx('new_title')}>
                <div className={cx('title-h2')} style={{ fontSize: '15px', padding: '3px 12px 2px 20px' }}>
                    ĐÈN TRANG TRÍ CÙNG LOẠI
                </div>
            </div>

            <div className={cx('row', 'new__products-item-wrapper')}>
                {getCateID.rows.map((cateProduct) => (
                    <NewProduct
                        key={cateProduct.id}
                        id={cateProduct.id}
                        img={cateProduct.AnhDaiDien}
                        name={cateProduct.TenSanPham}
                        priceOld={cateProduct.Gia}
                        priceNew={cateProduct.GiaGiam}
                        sale="30"
                    />
                ))}
            </div>

            <div className={cx('page', 'col', 'c-12')}>
                <Pagination total={getCateID.count} pageSize={8} />
            </div>
        </div>
    );
}

export default SanPham;
