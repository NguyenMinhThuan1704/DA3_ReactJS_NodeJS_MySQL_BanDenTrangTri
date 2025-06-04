import httpRequest from '~/utils/httpRequest';

export const createPaymentLink = async ({ checkoutInfo, totalPrice, maKH, cartList }) => {
    try {
        const response = await httpRequest.post('/payment-link', {
            MaKH: maKH,
            TenKH: checkoutInfo.TenKH,
            SoDienThoai: checkoutInfo.SoDienThoai,
            DiaChi: checkoutInfo.DiaChi,
            Email: checkoutInfo.Email,
            TongGia: totalPrice,
            cartList: cartList,
        });

        return response;
    } catch (error) {
        console.error('Lỗi khi tạo liên kết thanh toán:', error);
        alert('Có lỗi xảy ra khi tạo liên kết thanh toán. Vui lòng thử lại.');
        return null;
    }
};
