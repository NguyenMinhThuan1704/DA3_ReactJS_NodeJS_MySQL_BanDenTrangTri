import httpRequest from '~/utils/httpRequest';

const getDanhGiaById = async (id) => {
    return await httpRequest.get('/danhgias/id/' + id);
};

const getDanhGia = async ({ page, pageSize = 8, MaSanPham, MaKhachHang }) => {
    const params = { page, pageSize };
    if (MaSanPham) params.MaSanPham = MaSanPham;
    if (MaKhachHang) params.MaKhachHang = MaKhachHang;

    return await httpRequest.get('/danhgias', { params });
};

const createDanhGia = async (data) => {
    return await httpRequest.post('/danhgias', data, {});
};

const updateDanhGia = async (data, id) => {
    return await httpRequest.put('/danhgias/' + id, data);
};

const deleteDanhGia = async (id) => {
    return await httpRequest.delete('/danhgias/' + id);
};

const searchDanhGia = async ({ page, value }) => {
    return await httpRequest.get(`/danhgias/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const searchDanhGiaUser = async ({ page, value }) => {
    return await httpRequest.get(`/danhgias/search?q=${value}`, {
        params: {
            page,
            pageSize: 12,
        },
    });
};

const danhgiaService = {
    getDanhGia,
    getDanhGiaById,
    createDanhGia,
    updateDanhGia,
    deleteDanhGia,
    searchDanhGia,
    searchDanhGiaUser,
};

export default danhgiaService;
