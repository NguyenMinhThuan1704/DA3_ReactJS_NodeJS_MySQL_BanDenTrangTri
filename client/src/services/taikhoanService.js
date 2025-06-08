import { jwtDecode } from 'jwt-decode';
import httpRequest from '~/utils/httpRequest';

const getTaiKhoan = async ({ page }) => {
    return await httpRequest.get('/taikhoans', {
        params: {
            page,
        },
    });
};

const getTaiKhoanById = async (id) => {
    return await httpRequest.get('/taikhoans/id/' + id);
};

const getTaiKhoanAll = async () => {
    return await httpRequest.get('/taikhoans', {
        params: {
            page: 1,
            pageSize: 1000,
        },
    });
};

const getTaiKhoanAndLoaiTK = async ({ page }) => {
    return await httpRequest.get('/taikhoans/ltk', {
        params: {
            page,
        },
    });
};

const createTaiKhoan = async (data) => {
    return await httpRequest.post('/taikhoans', data, {});
};

const login = async (data) => {
    const res = await httpRequest.post('/taikhoans/login', data);

    const { token } = res.data;
    if (token) {
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        localStorage.setItem('userinfo', JSON.stringify(decodedToken.data));
    }
    return res;
};

const logout = async () => {
    localStorage.removeItem('token');
    return await httpRequest.post('/taikhoans/logout');
};

const updateTaiKhoan = async (data, id) => {
    return await httpRequest.put('/taikhoans/' + id, data);
};

const deleteTaiKhoan = async (id) => {
    return await httpRequest.delete('/taikhoans/' + id);
};

const searchTaiKhoan = async ({ page, value }) => {
    return await httpRequest.get(`/taikhoans/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const taikhoanService = {
    getTaiKhoan,
    getTaiKhoanById,
    getTaiKhoanAll,
    getTaiKhoanAndLoaiTK,
    createTaiKhoan,
    updateTaiKhoan,
    deleteTaiKhoan,
    searchTaiKhoan,
    login,
    logout,
};

export default taikhoanService;
