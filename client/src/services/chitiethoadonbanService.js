import httpRequest from '~/utils/httpRequest';

const getChiTietHoaDonBan = async ({ page }) => {
    return await httpRequest.get('/chitiethoadonbans', {
        params: {
            page,
        },
    });
};

const getChiTietHoaDonBanByMaHD = async ({ page, MaHoaDonBan }) => {
    return await httpRequest.get(`/chitiethoadonbans/order/${MaHoaDonBan}`, {
        params: {
            page,
            pageSize: 10,
        },
    });
};

const getChiTietHoaDonBanByMaHD1 = async (MaHoaDonBan) => {
    return await httpRequest.get(`/chitiethoadonbans/order/${MaHoaDonBan}`);
};

const searchChiTietHoaDonBan = async ({ page, value }) => {
    return await httpRequest.get(`/chitiethoadonbans/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const createChiTietHoaDonBan = async (data) => {
    return await httpRequest.post('/chitiethoadonbans', data, {});
};

const updateChiTietHoaDonBan = async (data, id) => {
    return await httpRequest.put('/chitiethoadonbans/' + id, data);
};

const deleteChiTietHoaDonBan = async (id) => {
    return await httpRequest.delete('/chitiethoadonbans/' + id);
};

const chitiethoadonbanService = {
    getChiTietHoaDonBan,
    getChiTietHoaDonBanByMaHD,
    getChiTietHoaDonBanByMaHD1,
    createChiTietHoaDonBan,
    updateChiTietHoaDonBan,
    deleteChiTietHoaDonBan,
    searchChiTietHoaDonBan,
};

export default chitiethoadonbanService;
