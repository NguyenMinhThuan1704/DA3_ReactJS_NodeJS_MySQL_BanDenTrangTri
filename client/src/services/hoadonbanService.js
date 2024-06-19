import httpRequest from '~/utils/httpRequest';

const getHoaDonBan = async ({ page }) => {
    return await httpRequest.get('/hoadonbans', {
        params: {
            page,
        },
    });
};

const getHoaDonBanByAcc = async ({ page, MaKH }) => {
    return await httpRequest.get(`/hoadonbans/acc/${MaKH}`, {
        params: {
            page,
            pageSize: 10,
        },
    });
};

const searchHoaDonBan = async ({ page, value }) => {
    return await httpRequest.get(`/hoadonbans/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const TKHoaDonBan = async ({ page, data }) => {
    return await httpRequest.post('/hoadonbans/callHDBTK', data, {
        params: {
            page,
        },
    });
};

const createHoaDonBan = async (data) => {
    return await httpRequest.post('/hoadonbans', data, {});
};

const updateHoaDonBan = async (data, id) => {
    return await httpRequest.put('/hoadonbans/' + id, data);
};

const deleteHoaDonBan = async (id) => {
    return await httpRequest.delete('/hoadonbans/' + id);
};

const hoadonbanService = {
    getHoaDonBan,
    getHoaDonBanByAcc,
    TKHoaDonBan,
    createHoaDonBan,
    updateHoaDonBan,
    deleteHoaDonBan,
    searchHoaDonBan,
};

export default hoadonbanService;
