const danhgiaService = require("../services/danhgiaService");

class DanhGiaController {
  // API
  // [GET] /DanhGias
  getDanhGia = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await danhgiaService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [GET] /DanhGias theo mã
  getDanhGiaByID = async (req, res) => {
    const id = req.params.id;
    const data = await danhgiaService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [GET] /DanhGias theo mã sản phẩm
  getDanhGiaByProduct = async (req, res) => {
    const MaSanPham = req.params.MaSanPham;
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await danhgiaService.find({
      page: page,
      pageSize,
      where: {
        MaLoaiDanhGia: MaLoaiDanhGia,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /DanhGias
  createDanhGia = async (req, res) => {
    const data = await danhgiaService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /DanhGias/:id
  updateDanhGia = async (req, res) => {
    const id = req.params.id;
    const data = await danhgiaService.update({
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

  // [DELETE] /DanhGias/:id
  deleteDanhGia = async (req, res) => {
    const id = req.params.id;

    const data = await danhgiaService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /DanhGias/search
  searchDanhGia = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await danhgiaService.search({
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

module.exports = new DanhGiaController();
