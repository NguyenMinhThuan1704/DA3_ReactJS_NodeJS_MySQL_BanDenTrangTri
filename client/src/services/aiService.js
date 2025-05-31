import httpRequest from '~/utils/httpRequest';

export const aiAnalyzeImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('images', file);
    });

    const response = await httpRequest.post('/api/images/analyze', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const imageAnalyzeService = {
    aiAnalyzeImages,
};

export default imageAnalyzeService;
