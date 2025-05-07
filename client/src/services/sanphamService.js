import httpRequest from '~/utils/httpRequest';

const getSanPham = async ({ page }) => {
    return await httpRequest.get('/sanphams', {
        params: {
            page,
        },
    });
};

const getSanPhamById = async (id) => {
    return await httpRequest.get('/sanphams/id/' + id);
};

const getSanPhamByCate = async ({ page, MaLoaiSanPham }) => {
    return await httpRequest.get(`/sanphams/cate/${MaLoaiSanPham}`, {
        params: {
            page,
            pageSize: 8,
        },
    });
};

// const getSanPhamByCate = async ({ MaLoaiSanPham }) => {
//     return await httpRequest.get(`/sanphams/cate/${MaLoaiSanPham}`);
// };

const getSanPhamAll = async () => {
    return await httpRequest.get('/sanphams', {
        params: {
            page: 1,
            pageSize: 2000,
        },
    });
};

const getProcDay = async () => {
    return await httpRequest.get('/sanphams/callProcDay');
};

const getProcWeek = async () => {
    return await httpRequest.get('/sanphams/callProcWeek');
};

const getProcMonth = async () => {
    return await httpRequest.get('/sanphams/callProcMonth');
};

const getProcYear = async () => {
    return await httpRequest.get('/sanphams/callProcYear');
};
const apiUploadImages = (images) =>
    new Promise(async (resolve, reject) => {
        try {
            // const response = await axios({
            //     method: 'post',
            //     url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
            //     data: images,
            // });
            const response = await httpRequest.post(
                // `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
                images,
                {},
            );
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

const postTKSP = async (data) => {
    return await httpRequest.post('/sanphams/callTKSP', data, {});
};

const createSanPham = async (data) => {
    return await httpRequest.post('/sanphams', data, {});
};

const updateSanPham = async (data, id) => {
    return await httpRequest.put('/sanphams/' + id, data);
};

const deleteSanPham = async (id) => {
    return await httpRequest.delete('/sanphams/' + id);
};

const searchSanPham = async ({ page, value }) => {
    return await httpRequest.get(`/sanphams/search?q=${value}`, {
        params: {
            page,
            // pageSize: 12,
        },
    });
};

const searchSanPhamUser = async ({ page, value }) => {
    return await httpRequest.get(`/sanphams/search?q=${value}`, {
        params: {
            page,
            pageSize: 12,
        },
    });
};

const sanphamService = {
    getSanPham,
    getSanPhamById,
    getSanPhamByCate,
    getSanPhamAll,
    createSanPham,
    updateSanPham,
    deleteSanPham,
    searchSanPham,
    searchSanPhamUser,
    getProcDay,
    getProcWeek,
    getProcMonth,
    getProcYear,
    postTKSP,
    apiUploadImages,
};

export default sanphamService;
