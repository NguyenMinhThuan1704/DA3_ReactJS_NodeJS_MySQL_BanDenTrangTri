import httpRequest from '~/utils/httpRequest';

const getNhaPhanPhoi = async ({ page }) => {
    return await httpRequest.get('/nhaphanphois', {
        params: {
            page,
        },
    });
};

const getNhaPhanPhoiById = async (id) => {
    return await httpRequest.get('/nhaphanphois/id/' + id);
};

const getNhaPhanPhoiAll = async () => {
    return await httpRequest.get('/nhaphanphois', {
        params: {
            page: 1,
            pageSize: 100,
        },
    });
};

const searchNhaPhanPhoi = async ({ page, value }) => {
    return await httpRequest.get(`/nhaphanphois/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const createNhaPhanPhoi = async (data) => {
    return await httpRequest.post('/nhaphanphois', data, {});
};

const updateNhaPhanPhoi = async (data, id) => {
    return await httpRequest.put('/nhaphanphois/' + id, data);
};

const deleteNhaPhanPhoi = async (id) => {
    return await httpRequest.delete('/nhaphanphois/' + id);
};

const nhaphanphoiService = {
    getNhaPhanPhoi,
    getNhaPhanPhoiById,
    getNhaPhanPhoiAll,
    createNhaPhanPhoi,
    updateNhaPhanPhoi,
    deleteNhaPhanPhoi,
    searchNhaPhanPhoi,
};

export default nhaphanphoiService;
