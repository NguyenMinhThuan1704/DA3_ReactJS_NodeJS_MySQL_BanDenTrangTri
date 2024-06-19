const loaisanphamService = require("../services/loaisanphamService");

class LoaiSanPhamController {
  // API
  // [GET] /LoaiSanPhams
  getLoaiSanPham = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await loaisanphamService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [GET] /LoaiSanPhams theo mã loại sản phẩm
  getLoaiSanPhamByID = async (req, res) => {
    const id = req.params.id;
    const data = await loaisanphamService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /LoaiSanPhams
  createLoaiSanPham = async (req, res) => {
    const data = await loaisanphamService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /LoaiSanPhams/:id
  updateLoaiSanPham = async (req, res) => {
    const id = req.params.id;
    const data = await loaisanphamService.update({
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

  // [DELETE] /LoaiSanPhams/:id
  deleteLoaiSanPham = async (req, res) => {
    const id = req.params.id;

    const data = await loaisanphamService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /LoaiSPs/search
  searchLoaiSP = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await loaisanphamService.search({
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

module.exports = new LoaiSanPhamController();
