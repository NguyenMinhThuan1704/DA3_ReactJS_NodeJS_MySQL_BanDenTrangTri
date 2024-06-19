const duanthuchienService = require("../services/duanthuchienService");

class DuAnThucHienController {
  // API
  // [GET] /DuAnThucHiens
  getDuAnThucHien = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await duanthuchienService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [POST] /DuAnThucHiens
  createDuAnThucHien = async (req, res) => {
    const data = await duanthuchienService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /DuAnThucHiens/:id
  updateDuAnThucHien = async (req, res) => {
    const id = req.params.id;
    const data = await duanthuchienService.update({
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

  // [DELETE] /DuAnThucHiens/:id
  deleteDuAnThucHien = async (req, res) => {
    const id = req.params.id;

    const data = await duanthuchienService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /DATHs/search
  searchDATH = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await duanthuchienService.search({ 
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

module.exports = new DuAnThucHienController();
