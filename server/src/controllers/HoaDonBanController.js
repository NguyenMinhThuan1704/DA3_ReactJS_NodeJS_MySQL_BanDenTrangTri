const hoadonbanService = require("../services/hoadonbanService");

class HoaDonBanController {
  // API
  // [GET] /HoaDonBans
  getHoaDonBan = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await hoadonbanService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  getHoaDonBanByAcc = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const MaKH = req.params.MaKH;
    const data = await hoadonbanService.find({
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

  // [GET] /HoaDonBans theo mã loại sản phẩm
  getHoaDonBanByID = async (req, res) => {
    const id = req.params.id;
    const data = await hoadonbanService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /HoaDonBans
  createHoaDonBan = async (req, res) => {
    const data = await hoadonbanService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /HoaDonBans/:id
  updateHoaDonBan = async (req, res) => {
    const id = req.params.id;
    const data = await hoadonbanService.update({
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

  // [DELETE] /HoaDonBans/:id
  deleteHoaDonBan = async (req, res) => {
    const id = req.params.id;

    const data = await hoadonbanService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /HoaDonBans/search
  searchHoaDonBan = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await hoadonbanService.search({
      page: page,
      pageSize,
      searchString,
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  callProcHoaDonBanThongKe = async (req, res) => {
    const procedureName = "sp_hoadonban_thong_ke";
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const params = Object.values(req.body);

    try {
      const data = await hoadonbanService.callProcedure(procedureName, params, {
        page: page,
        pageSize: pageSize,
      });

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

module.exports = new HoaDonBanController();
