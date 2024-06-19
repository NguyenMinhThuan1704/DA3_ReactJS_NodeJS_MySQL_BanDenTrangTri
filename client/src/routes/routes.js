import config from '~/config';
// Layouts
import { AdminLayout } from '~/layouts';
// Pages
import Home from '~/pages/User/Home';
import SanPham from '~/pages/User/SanPham';
import DanhMuc from '~/pages/User/DanhMuc';
import Search from '~/pages/User/Search';
import GioiThieu from '~/pages/User/GioiThieu';
import KhuyenMai from '~/pages/User/KhuyenMai';
import TinTuc from '~/pages/User/TinTuc';
import DuAnThucHien from '~/pages/User/DuAnThucHien';
import LienHe from '~/pages/User/LienHe';
import GioHang from '~/pages/User/GioHang';
import DonHang from '~/pages/User/DonHang';
import Login from '~/pages/User/Login';
import Register from '~/pages/User/Register';

import TongQuan_Admin from '~/pages/Admin/TongQuan';
import LoaiSanPham_Admin from '~/pages/Admin/LoaiSanPham';
import SanPham_Admin from '~/pages/Admin/SanPham';
import NhaCungCap_Admin from '~/pages/Admin/NhaCungCap';
import KhachHang_Admin from '~/pages/Admin/KhachHang';
import HoaDonNhap_Admin from '~/pages/Admin/HoaDonNhap';
import HoaDonBan_Admin from '~/pages/Admin/HoaDonBan';
import TinTuc_Admin from '~/pages/Admin/TinTuc';
import DuAnThucHien_Admin from '~/pages/Admin/DuAnThucHien';
import TaiKhoan_Admin from '~/pages/Admin/TaiKhoan';
import ThongKe_Admin from '~/pages/Admin/ThongKe';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.sanpham, component: SanPham },
    { path: config.routes.danhmuc, component: DanhMuc },
    { path: config.routes.search, component: Search },
    { path: config.routes.gioithieu, component: GioiThieu },
    { path: config.routes.khuyenmai, component: KhuyenMai },
    { path: config.routes.tintuc, component: TinTuc },
    { path: config.routes.duanthuchien, component: DuAnThucHien },
    { path: config.routes.lienhe, component: LienHe },
    { path: config.routes.giohang, component: GioHang },
    { path: config.routes.donhang, component: DonHang },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },

    { path: config.routes.tongquan_admin, component: TongQuan_Admin, layout: AdminLayout },
    { path: config.routes.loaisanpham_admin, component: LoaiSanPham_Admin, layout: AdminLayout },
    { path: config.routes.sanpham_admin, component: SanPham_Admin, layout: AdminLayout },
    { path: config.routes.nhacungcap_admin, component: NhaCungCap_Admin, layout: AdminLayout },
    { path: config.routes.khachhang_admin, component: KhachHang_Admin, layout: AdminLayout },
    { path: config.routes.hoadonnhap_admin, component: HoaDonNhap_Admin, layout: AdminLayout },
    { path: config.routes.hoadonban_admin, component: HoaDonBan_Admin, layout: AdminLayout },
    { path: config.routes.tintuc_admin, component: TinTuc_Admin, layout: AdminLayout },
    { path: config.routes.duanthuchien_admin, component: DuAnThucHien_Admin, layout: AdminLayout },
    { path: config.routes.taikhoan_admin, component: TaiKhoan_Admin, layout: AdminLayout },
    { path: config.routes.thongke_admin, component: ThongKe_Admin, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
