import httpRequest from '~/utils/httpRequest';

const getCart = async ({ page }) => {
    return await httpRequest.get('/carts', {
        params: {
            page,
        },
    });
};

const getCartAll = async ({ page }) => {
    return await httpRequest.get('/carts', {
        params: {
            page,
            pageSize: 100,
        },
    });
};

const getCartByAcc = async ({ id }) => {
    return await httpRequest.get(`/carts/acc/${id}`, {
        params: {
            pageSize: 100,
        },
    });
};

const searchCart = async ({ page, value }) => {
    return await httpRequest.get(`/carts/search?q=${value}`, {
        params: {
            page,
        },
    });
};

const createCart = async (data) => {
    return await httpRequest.post('/carts', data, {});
};

const updateCart = async (id, data) => {
    return await httpRequest.put('/carts/' + id, data);
};

const deleteCart = async (id) => {
    return await httpRequest.delete('/carts/' + id);
};

const deleteCartByAcc = async (MaTaiKhoan) => {
    return await httpRequest.delete('/carts/acc/' + MaTaiKhoan);
};

const cartService = {
    getCart,
    getCartAll,
    createCart,
    updateCart,
    deleteCart,
    deleteCartByAcc,
    searchCart,
    getCartByAcc,
};

export default cartService;
