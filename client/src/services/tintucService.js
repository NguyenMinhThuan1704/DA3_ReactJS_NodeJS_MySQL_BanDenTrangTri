import httpRequest from '~/utils/httpRequest';

const getTinTuc = async ({ page }) => {
    return await httpRequest.get('/tintucs', {
        params: {
            page,
        },
    });
};

const createTinTuc = async (data) => {
    return await httpRequest.post('/tintucs', data, {});
};

const updateTinTuc = async (data, id) => {
    return await httpRequest.put('/tintucs/' + id, data);
};

const deleteTinTuc = async (id) => {
    return await httpRequest.delete('/tintucs/' + id);
};

const searchTinTuc = async ({ page, value }) => {
    return await httpRequest.get(`/tintucs/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const tintucService = {
    getTinTuc,
    createTinTuc,
    updateTinTuc,
    deleteTinTuc,
    searchTinTuc,
};

export default tintucService;
