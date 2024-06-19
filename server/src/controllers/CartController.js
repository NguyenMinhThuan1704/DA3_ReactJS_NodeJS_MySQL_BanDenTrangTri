const cartService = require("../services/cartService");

class CartController {
  // API
  // [GET] /Carts
  getCart = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await cartService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  getCartByAcc = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const MaTaiKhoan = req.params.MaTaiKhoan;
    const data = await cartService.find({
      page: page,
      pageSize,
      where: {
        MaTaiKhoan: MaTaiKhoan,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [GET] /Carts theo mã sản phẩm
  getCartByID = async (req, res) => {
    const id = req.params.id;
    const data = await cartService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /Carts
  createCart = async (req, res) => {
    const data = await cartService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /Carts/:id
  updateCart = async (req, res) => {
    const id = req.params.id;
    const data = await cartService.update({
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

  // [DELETE] /Carts/:id
  deleteCart = async (req, res) => {
    const id = req.params.id;

    const data = await cartService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  deleteCartByAcc = async (req, res) => {
    const MaTaiKhoan = req.params.MaTaiKhoan;

    const data = await cartService.delete({
      where: {
        MaTaiKhoan,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /NPPs/search
  searchCart = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await cartService.search({
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

module.exports = new CartController();
