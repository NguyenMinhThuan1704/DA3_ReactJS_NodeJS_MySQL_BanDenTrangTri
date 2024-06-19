const chitiethoadonbanService = require("../services/chitiethoadonbanService");

class ChiTietHoaDonBanController {
  // API
  // [GET] /ChiTietHoaDonBans
  getChiTietHoaDonBan = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await chitiethoadonbanService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [GET] /ChiTietHoaDonBans theo mã loại sản phẩm
  getChiTietHoaDonBanByID = async (req, res) => {
    const id = req.params.id;
    const data = await chitiethoadonbanService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  getChiTietHoaDonBanByHoaDonBan = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const MaHoaDonBan = req.params.MaHoaDonBan;
    const data = await chitiethoadonbanService.find({
      page: page,
      pageSize,
      where: {
        MaHoaDonBan: MaHoaDonBan,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /ChiTietHoaDonBans
  createChiTietHoaDonBan = async (req, res) => {
    const data = await chitiethoadonbanService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /ChiTietHoaDonBans/:id
  updateChiTietHoaDonBan = async (req, res) => {
    const id = req.params.id;
    const data = await chitiethoadonbanService.update({
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

  // [DELETE] /ChiTietHoaDonBans/:id
  deleteChiTietHoaDonBan = async (req, res) => {
    const id = req.params.id;

    const data = await chitiethoadonbanService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /ChiTietHoaDonBans/search
  searchChiTietHoaDonBan = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await chitiethoadonbanService.search({
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

module.exports = new ChiTietHoaDonBanController();
