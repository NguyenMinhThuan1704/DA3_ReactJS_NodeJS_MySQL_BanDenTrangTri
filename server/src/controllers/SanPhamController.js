const sanphamService = require("../services/sanphamService");

class SanPhamController {
  // API
  // [GET] /SanPhams
  getSanPham = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await sanphamService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [GET] /SanPhams theo mã sản phẩm
  getSanPhamByID = async (req, res) => {
    const id = req.params.id;
    const data = await sanphamService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [GET] /SanPhams theo mã loại sản phẩm
  getSanPhamByCategory = async (req, res) => {
    const MaLoaiSanPham = req.params.MaLoaiSanPham;
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await sanphamService.find({
      page: page,
      pageSize,
      where: {
        MaLoaiSanPham: MaLoaiSanPham,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /SanPhams
  createSanPham = async (req, res) => {
    const data = await sanphamService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /SanPhams/:id
  updateSanPham = async (req, res) => {
    const id = req.params.id;
    const data = await sanphamService.update({
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

  // [DELETE] /SanPhams/:id
  deleteSanPham = async (req, res) => {
    const id = req.params.id;

    const data = await sanphamService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /SanPhams/search
  searchSanPham = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await sanphamService.search({
      page: page,
      pageSize,
      searchString,
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  callProcDay = async (req, res) => {
    const procedureName = "GetDailyRevenue";

    const data = await sanphamService.callProcedure(procedureName);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  callProcWeek = async (req, res) => {
    const procedureName = "GetWeeklyRevenue";

    const data = await sanphamService.callProcedure(procedureName);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  callProcMonth = async (req, res) => {
    const procedureName = "GetMonthlyRevenue";

    const data = await sanphamService.callProcedure(procedureName);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  callProcYear = async (req, res) => {
    const procedureName = "GetYearlyRevenue";

    const data = await sanphamService.callProcedure(procedureName);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  callProcThongKeSP = async (req, res) => {
    const procedureName = "sp_LaySanPhamTheoChucNang";
    const params = [req.body.ChucNang];

    try {
      const data = await sanphamService.callProcedure(procedureName, params);

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

module.exports = new SanPhamController();
