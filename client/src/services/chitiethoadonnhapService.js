import httpRequest from '~/utils/httpRequest';

const getChiTietHoaDonNhap = async ({ page }) => {
    return await httpRequest.get('/chitiethoadonnhaps', {
        params: {
            page,
        },
    });
};

const getChiTietHoaDonNhapByMaHD = async ({ page, MaHoaDonNhap }) => {
    return await httpRequest.get(`/chitiethoadonnhaps/hdn/${MaHoaDonNhap}`, {
        params: {
            page,
            pageSize: 10,
        },
    });
};

const getChiTietHoaDonNhapByMaHD1 = async (MaHoaDonNhap) => {
    return await httpRequest.get(`/chitiethoadonnhaps/hdn/${MaHoaDonNhap}`);
};

const searchChiTietHoaDonNhap = async ({ page, value }) => {
    return await httpRequest.get(`/chitiethoadonnhaps/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const createChiTietHoaDonNhap = async (data) => {
    return await httpRequest.post('/chitiethoadonnhaps', data, {});
};

const updateChiTietHoaDonNhap = async (data, id) => {
    return await httpRequest.put('/chitiethoadonnhaps/' + id, data);
};

const deleteChiTietHoaDonNhap = async (id) => {
    return await httpRequest.delete('/chitiethoadonnhaps/' + id);
};

const chitiethoadonnhapService = {
    getChiTietHoaDonNhap,
    getChiTietHoaDonNhapByMaHD,
    getChiTietHoaDonNhapByMaHD1,
    createChiTietHoaDonNhap,
    updateChiTietHoaDonNhap,
    deleteChiTietHoaDonNhap,
    searchChiTietHoaDonNhap,
};

export default chitiethoadonnhapService;
