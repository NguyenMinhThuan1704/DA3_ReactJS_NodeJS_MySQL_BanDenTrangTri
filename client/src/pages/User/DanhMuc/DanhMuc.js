/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DanhMuc.module.scss';
import NewProduct from '../Home/NewProduct';
import Pagination from '../../../components/Pagination/Pagination';
import sanphamService from '../../../services/sanphamService';
import { getFirstImage } from '../../getFirstImage';

const cx = classNames.bind(styles);

function DanhMuc() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [getCate, setGetCate] = useState({ rows: [], count: 0 });

    useEffect(() => {
        if (Number(searchParams.get('page')) > 0 && id) {
            sanphamService
                .getSanPhamByCate({ page: Number(searchParams.get('page')), MaLoaiSanPham: id })
                .then((res) => {
                    setGetCate(res.data.data);
                });
        }
    }, [searchParams, id]);

    useEffect(() => {
        if (!searchParams.get('page')) {
            setSearchParams({ page: 1 });
        }
    }, [searchParams, setSearchParams]);

    return (
        <div className={cx('container', 'grid', 'wide')}>
            <div className={cx('new_title')}>
                <ul className={cx('breadcrumb', 'title-h2')}>
                    <li className={cx('breadcrumb-item')}>
                        <a href="" title="Trang chủ">
                            Trang chủ
                        </a>
                    </li>
                    <li className={cx('breadcrumb-item')}>
                        <a href="" title="Danh mục">
                            Danh mục
                        </a>
                    </li>
                </ul>
            </div>

            <div className={cx('new__product')} style={{ paddingTop: '10px' }}>
                <div className={cx('row', 'new__product-item-wrapper', 'den_moi')}>
                    {getCate.rows.map((newproduct) => {
                        const firstUrl = getFirstImage(newproduct.AnhDaiDien);
                        return (
                            <NewProduct
                                key={newproduct.id}
                                id={newproduct.id}
                                img={firstUrl}
                                name={newproduct.TenSanPham}
                                priceOld={newproduct.Gia}
                                priceNew={newproduct.GiaGiam}
                                sale="30"
                            />
                        );
                    })}
                </div>
            </div>

            <div className={cx('page', 'col', 'c-12')}>
                <Pagination total={getCate.count} pageSize={8} />
            </div>
        </div>
    );
}

export default DanhMuc;
