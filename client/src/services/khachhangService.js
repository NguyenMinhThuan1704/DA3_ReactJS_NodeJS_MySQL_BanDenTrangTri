import httpRequest from '~/utils/httpRequest';

const getKhachHang = async ({ page }) => {
    return await httpRequest.get('/khachhangs', {
        params: {
            page,
        },
    });
};

const searchKhachHang = async ({ page, value }) => {
    return await httpRequest.get(`/khachhangs/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const createKhachHang = async (data) => {
    return await httpRequest.post('/khachhangs', data, {});
};

const updateKhachHang = async (data, id) => {
    return await httpRequest.put('/khachhangs/' + id, data);
};

const deleteKhachHang = async (id) => {
    return await httpRequest.delete('/khachhangs/' + id);
};

const khachhangService = {
    getKhachHang,
    createKhachHang,
    updateKhachHang,
    deleteKhachHang,
    searchKhachHang,
};

export default khachhangService;
