const loaitaikhoanService = require("../services/loaitaikhoanService");

class LoaiTaiKhoanController {
  // API
  // [GET] /LoaiTaiKhoans
  getLoaiTaiKhoan = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await loaitaikhoanService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [GET] /LoaiTaiKhoans theo mã loại sản phẩm
  getLoaiTaiKhoanByID = async (req, res) => {
    const id = req.params.id;
    const data = await loaitaikhoanService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /LoaiTaiKhoans
  createLoaiTaiKhoan = async (req, res) => {
    const data = await loaitaikhoanService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /LoaiTaiKhoans/:id
  updateLoaiTaiKhoan = async (req, res) => {
    const id = req.params.id;
    const data = await loaitaikhoanService.update({
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

  // [DELETE] /LoaiTaiKhoans/:id
  deleteLoaiTaiKhoan = async (req, res) => {
    const id = req.params.id;

    const data = await loaitaikhoanService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /LoaiTKs/search
  searchLoaiTK = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await loaitaikhoanService.search({
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

module.exports = new LoaiTaiKhoanController();
