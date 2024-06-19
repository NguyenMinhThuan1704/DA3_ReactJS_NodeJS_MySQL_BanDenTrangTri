const nhaphanphoiService = require("../services/nhaphanphoiService");

class NhaPhanPhoiController {
  // API
  // [GET] /NhaPhanPhois
  getNhaPhanPhoi = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await nhaphanphoiService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [GET] /NhaPhanPhois theo mã loại sản phẩm
  getNhaPhanPhoiByID = async (req, res) => {
    const id = req.params.id;
    const data = await nhaphanphoiService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /NhaPhanPhois
  createNhaPhanPhoi = async (req, res) => {
    const data = await nhaphanphoiService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /NhaPhanPhois/:id
  updateNhaPhanPhoi = async (req, res) => {
    const id = req.params.id;
    const data = await nhaphanphoiService.update({
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

  // [DELETE] /NhaPhanPhois/:id
  deleteNhaPhanPhoi = async (req, res) => {
    const id = req.params.id;

    const data = await nhaphanphoiService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /NPPs/search
  searchNPP = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await nhaphanphoiService.search({
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

module.exports = new NhaPhanPhoiController();
