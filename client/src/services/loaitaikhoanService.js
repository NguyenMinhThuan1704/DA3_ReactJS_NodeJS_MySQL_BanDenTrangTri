import httpRequest from '~/utils/httpRequest';

const getLoaiTaiKhoan = async ({ page }) => {
    return await httpRequest.get('/loaitaikhoans', {
        params: {
            page,
        },
    });
};

const getLoaiTaiKhoanAll = async () => {
    return await httpRequest.get('/loaitaikhoans', {
        params: {
            page: 1,
            pageSize: 1000,
        },
    });
};

const createLoaiTaiKhoan = async (data) => {
    return await httpRequest.post('/loaitaikhoans', data, {});
};

const updateLoaiTaiKhoan = async (data, id) => {
    return await httpRequest.put('/loaitaikhoans/' + id, data);
};

const deleteLoaiTaiKhoan = async (id) => {
    return await httpRequest.delete('/loaitaikhoans/' + id);
};

const loaitaikhoanService = {
    getLoaiTaiKhoan,
    getLoaiTaiKhoanAll,
    createLoaiTaiKhoan,
    updateLoaiTaiKhoan,
    deleteLoaiTaiKhoan,
};

export default loaitaikhoanService;
