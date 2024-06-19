const chitiethoadonnhapService = require("../services/chitiethoadonnhapService");

class ChiTietHoaDonNhapController {
  // API
  // [GET] /ChiTietHoaDonNhaps
  getChiTietHoaDonNhap = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await chitiethoadonnhapService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [GET] /ChiTietHoaDonNhaps theo mã loại sản phẩm
  getChiTietHoaDonNhapByID = async (req, res) => {
    const id = req.params.id;
    const data = await chitiethoadonnhapService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  getChiTietHoaDonNhapByHoaDonNhap = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const MaHoaDonNhap = req.params.MaHoaDonNhap;
    const data = await chitiethoadonnhapService.find({
      page: page,
      pageSize,
      where: {
        MaHoaDonNhap: MaHoaDonNhap,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /ChiTietHoaDonNhaps
  createChiTietHoaDonNhap = async (req, res) => {
    const data = await chitiethoadonnhapService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /ChiTietHoaDonNhaps/:id
  updateChiTietHoaDonNhap = async (req, res) => {
    const id = req.params.id;
    const data = await chitiethoadonnhapService.update({
      data: {
        ...req.body,
      },
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [DELETE] /ChiTietHoaDonNhaps/:id
  deleteChiTietHoaDonNhap = async (req, res) => {
    const id = req.params.id;

    const data = await chitiethoadonnhapService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /ChiTietHoaDonNhaps/search
  searchChiTietHoaDonNhap = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await chitiethoadonnhapService.search({
      page: page,
      pageSize,
      searchString,
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };
}

module.exports = new ChiTietHoaDonNhapController();
