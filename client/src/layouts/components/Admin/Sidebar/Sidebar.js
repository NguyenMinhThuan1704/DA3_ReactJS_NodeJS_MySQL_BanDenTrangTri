/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import classNames from 'classnames/bind';
// import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    faTachometerAlt,
    faBoxes,
    faBarcode,
    faTruck,
    faUsers,
    faFileImport,
    faShoppingCart,
    faNewspaper,
    faFolderOpen,
    faUser,
    faChartColumn,
} from '@fortawesome/free-solid-svg-icons';

import config from '~/config';

function Sidebar() {
    return (
        <Menu>
            <MenuItem title="Tổng quan" to={config.routes.tongquan_admin} icon={faTachometerAlt} />
            <MenuItem title="Loại sản phẩm" to={config.routes.loaisanpham_admin} icon={faBoxes} />
            <MenuItem title="Sản phẩm" to={config.routes.sanpham_admin} icon={faBarcode} />
            <MenuItem title="Nhà cung cấp" to={config.routes.nhacungcap_admin} icon={faTruck} />
            <MenuItem title="Khách hàng" to={config.routes.khachhang_admin} icon={faUsers} />
            <MenuItem title="Hóa đơn nhập" to={config.routes.hoadonnhap_admin} icon={faFileImport} />
            <MenuItem title="Hóa đơn bán" to={config.routes.hoadonban_admin} icon={faShoppingCart} />
            <MenuItem title="Tin tức" to={config.routes.tintuc_admin} icon={faNewspaper} />
            <MenuItem title="Dự án thực hiện" to={config.routes.duanthuchien_admin} icon={faFolderOpen} />
            <MenuItem title="Tài khoản" to={config.routes.taikhoan_admin} icon={faUser} />
            <MenuItem title="Thống kê" to={config.routes.thongke_admin} icon={faChartColumn} />
        </Menu>
    );
}

export default Sidebar;
