const hoadonnhapService = require("../services/hoadonnhapService");

class HoaDonNhapController {
  // API
  // [GET] /HoaDonNhaps
  getHoaDonNhap = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await hoadonnhapService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  getHoaDonNhapByAcc = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const MaKH = req.params.MaKH;
    const data = await hoadonnhapService.find({
      page: page,
      pageSize,
      where: {
        MaKH: MaKH,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [GET] /HoaDonNhaps theo mã loại sản phẩm
  getHoaDonNhapByID = async (req, res) => {
    const id = req.params.id;
    const data = await hoadonnhapService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /HoaDonNhaps
  createHoaDonNhap = async (req, res) => {
    const data = await hoadonnhapService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /HoaDonNhaps/:id
  updateHoaDonNhap = async (req, res) => {
    const id = req.params.id;
    const data = await hoadonnhapService.update({
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

  // [DELETE] /HoaDonNhaps/:id
  deleteHoaDonNhap = async (req, res) => {
    const id = req.params.id;

    const data = await hoadonnhapService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /HoaDonNhaps/search
  searchHoaDonNhap = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await hoadonnhapService.search({
      page: page,
      pageSize,
      searchString,
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  callProcHoaDonNhapThongKe = async (req, res) => {
    const procedureName = "sp_hoadonnhap_thong_ke";
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const params = Object.values(req.body);

    try {
      const data = await hoadonnhapService.callProcedure(
        procedureName,
        params,
        {
          page: page,
          pageSize: pageSize,
        }
      );

      if (data.code === -1) {
        return res.status(500).json(data);
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error calling stored procedure:", error);
      return res
        .status(500)
        .json({ code: -1, message: "Internal server error" });
    }
  };
}

module.exports = new HoaDonNhapController();
