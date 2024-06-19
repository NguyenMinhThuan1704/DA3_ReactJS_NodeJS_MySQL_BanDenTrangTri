import httpRequest from '~/utils/httpRequest';

const getCategories = async ({ page }) => {
    return await httpRequest.get('/loaisanphams', {
        params: {
            page,
        },
    });
};

const getCategoryAll = async () => {
    return await httpRequest.get('/loaisanphams', {
        params: {
            page: 1,
            pageSize: 20,
        },
    });
};

const searchLoaiSP = async ({ page, value }) => {
    return await httpRequest.get(`/loaisanphams/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const createCategory = async (data) => {
    return await httpRequest.post('/loaisanphams', data, {});
};

const updateCategory = async (data, id) => {
    return await httpRequest.put('/loaisanphams/' + id, data);
};

const deleteCategory = async (id) => {
    return await httpRequest.delete('/loaisanphams/' + id);
};

const loaispService = {
    getCategoryAll,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    searchLoaiSP,
};

export default loaispService;
