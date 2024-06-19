import httpRequest from '~/utils/httpRequest';

const getHoaDonNhap = async ({ page }) => {
    return await httpRequest.get('/hoadonnhaps', {
        params: {
            page,
        },
    });
};

const getHoaDonNhapByAcc = async ({ page, MaKH }) => {
    return await httpRequest.get(`/hoadonnhaps/acc/${MaKH}`, {
        params: {
            page,
            pageSize: 10,
        },
    });
};

const searchHoaDonNhap = async ({ page, value }) => {
    return await httpRequest.get(`/hoadonnhaps/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const TKHoaDonNhap = async ({ page, data }) => {
    return await httpRequest.post('/hoadonnhaps/callHDNTK', data, {
        params: {
            page,
        },
    });
};

const createHoaDonNhap = async (data) => {
    return await httpRequest.post('/hoadonnhaps', data, {});
};

const updateHoaDonNhap = async (data, id) => {
    return await httpRequest.put('/hoadonnhaps/' + id, data);
};

const deleteHoaDonNhap = async (id) => {
    return await httpRequest.delete('/hoadonnhaps/' + id);
};

const hoadonnhapService = {
    getHoaDonNhap,
    getHoaDonNhapByAcc,
    TKHoaDonNhap,
    createHoaDonNhap,
    updateHoaDonNhap,
    deleteHoaDonNhap,
    searchHoaDonNhap,
};

export default hoadonnhapService;
