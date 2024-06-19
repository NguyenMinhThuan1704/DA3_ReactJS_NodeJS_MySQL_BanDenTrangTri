import httpRequest from '~/utils/httpRequest';

const getDuAnThucHien = async ({ page }) => {
    return await httpRequest.get('/duanthuchiens', {
        params: {
            page,
        },
    });
};

const searchDuAnThucHien = async ({ page, value }) => {
    return await httpRequest.get(`/duanthuchiens/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const createDuAnThucHien = async (data) => {
    return await httpRequest.post('/duanthuchiens', data, {});
};

const updateDuAnThucHien = async (data, id) => {
    return await httpRequest.put('/duanthuchiens/' + id, data);
};

const deleteDuAnThucHien = async (id) => {
    return await httpRequest.delete('/duanthuchiens/' + id);
};

const duanthuchienService = {
    getDuAnThucHien,
    createDuAnThucHien,
    updateDuAnThucHien,
    deleteDuAnThucHien,
    searchDuAnThucHien,
};

export default duanthuchienService;
