/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import NewProduct from '../Home/NewProduct';
import Pagination from '../../../components/Pagination/Pagination';
import sanphamService from '../../../services/sanphamService';

const cx = classNames.bind(styles);

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchs, setSearch] = useState({ rows: [], count: 0 });
    const searchTerm = String(searchParams.get('q'));
    const page = Number(searchParams.get('page'));

    useEffect(() => {
        if (page > 0 && searchTerm) {
            sanphamService.searchSanPhamUser({ page: page, value: searchTerm }).then((res) => {
                console.log(res);
                setSearch(res.data.data);
            });
        }
    }, [searchTerm, searchParams]);

    useEffect(() => {
        if (!searchParams.get('page')) {
            setSearchParams({ q: searchTerm, page: 1 });
        }
    }, [searchTerm, searchParams, setSearchParams]);

    return (
        <div className={cx('container', 'grid', 'wide')}>
            <div className={cx('new_title')}>
                <ul className={cx('breadcrumb', 'title-h2')}>
                    <li className={cx('breadcrumb-item')}>
                        <a href="/" title="Trang chủ">
                            Trang chủ
                        </a>
                    </li>
                    <li className={cx('breadcrumb-item')}>
                        <span>Kết quả tìm kiếm ( Đã tìm thấy {searchs.count} kết quả)</span>
                    </li>
                </ul>
            </div>

            <div className={cx('new__product')} style={{ paddingTop: '10px' }}>
                <div className={cx('row', 'new__product-item-wrapper', 'den_moi')}>
                    {searchs.rows.map((newproduct) => (
                        <NewProduct
                            key={newproduct.id}
                            id={newproduct.id}
                            img={newproduct.AnhDaiDien}
                            name={newproduct.TenSanPham}
                            priceOld={newproduct.Gia}
                            priceNew={newproduct.GiaGiam}
                            sale="30"
                        />
                    ))}
                </div>
            </div>

            <div className={cx('page', 'col', 'c-12')} style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination total={searchs.count} pageSize={10} />
            </div>
        </div>
    );
}

export default Search;
