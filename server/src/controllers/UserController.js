const userService = require("../services/userService");

class UserController {
  // API
  // [GET] /users
  getUser = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await userService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [POST] /users
  createUser = async (req, res) => {
    const data = await userService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /users/:id
  updateUser = async (req, res) => {
    const id = req.params.id;
    const data = await userService.update({
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

  // [DELETE] /users/:id
  deleteUser = async (req, res) => {
    const id = req.params.id;

    const data = await userService.delete({
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

module.exports = new UserController();
