const khachhangService = require("../services/khachhangService");

class KhachHangController {
  // API
  // [GET] /KhachHangs
  getKhachHang = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await khachhangService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
        return res.status(500).json(data);
    }

        return res.status(200).json(data);
    };

  // [GET] /KhachHangs theo mã loại sản phẩm
  getKhachHangByID = async (req, res) => {
    const id = req.params.id;
    const data = await khachhangService.find({
      where: {
        id: id
      }
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /KhachHangs
  createKhachHang = async (req, res) => {
    const data = await khachhangService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /KhachHangs/:id
  updateKhachHang = async (req, res) => {
    const id = req.params.id;
    const data = await khachhangService.update({
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

  // [DELETE] /KhachHangs/:id
  deleteKhachHang = async (req, res) => {
    const id = req.params.id;

    const data = await khachhangService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /KhachHangs/search
  searchKhachHang = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await khachhangService.search({ 
      page: page,
      pageSize,
      searchString 
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };
}

module.exports = new KhachHangController();
