const tintucService = require("../services/tintucService");

class TinTucController {
  // API
  // [GET] /TinTucs
  getTinTuc = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await tintucService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [GET] /TinTucs/search
  searchTinTuc = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const searchString = req.query.q;
    const data = await tintucService.search({
      page: page,
      pageSize,
      searchString,
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [POST] /TinTucs
  createTinTuc = async (req, res) => {
    const data = await tintucService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /TinTucs/:id
  updateTinTuc = async (req, res) => {
    const id = req.params.id;
    const data = await tintucService.update({
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

  // [DELETE] /TinTucs/:id
  deleteTinTuc = async (req, res) => {
    const id = req.params.id;

    const data = await tintucService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
}

module.exports = new TinTucController();
