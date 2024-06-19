const sequelize = require("../config/sequelize");
const taikhoanService = require("../services/taikhoanService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class TaiKhoanController {
  // [GET] /TaiKhoans
  getTaiKhoanAndLoaiTK = async (req, res) => {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const offset = (page - 1) * pageSize;

    const query = `
      SELECT *
      FROM TaiKhoans t, LoaiTaiKhoans l
      where t.MaLoaiTK = l.id
    `;

    try {
      const [results] = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      res.status(200).json({ data: results });
    } catch (error) {
      res.status(500).json({ code: -1, message: error.message });
    }
  };

  login = async (req, res) => {
    const taiKhoanValue = req.body.taikhoan;

    if (!taiKhoanValue) {
      return res
        .status(400)
        .json({ code: -1, message: "Missing 'taiKhoan' parameter" });
    }

    const query = `
      SELECT *
      FROM TaiKhoans
      WHERE TaiKhoan = ?
    `;

    try {
      const results = await sequelize.query(query, {
        replacements: [taiKhoanValue],
        type: sequelize.QueryTypes.SELECT,
      });

      if (results.length > 0) {
        bcrypt.compare(
          req.body.matkhau.toString(),
          results[0].MatKhau,
          (err, response) => {
            if (err) {
              throw new Error("Password compare error");
            }
            if (response) {
              const data = results[0];
              const token = jwt.sign({ data }, "jwt-secret-key", {
                expiresIn: "1d",
              });
              const id = results[0].id;
              res.cookie("token", token);
              return res.json({ Status: "Success", token, id });
            } else {
              return res.status(401).json({ Error: "Password not matched" });
            }
          }
        );
      } else {
        return res.status(404).json({ Error: "No account found" });
      }
    } catch (error) {
      res.status(500).json({ code: -1, message: error.message });
    }
  };

  logout = async (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success", message: "Logged out successfully" });
  };

  // API
  // [GET] /TaiKhoans
  getTaiKhoan = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await taikhoanService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [GET] /TaiKhoans theo mã loại sản phẩm
  getTaiKhoanByID = async (req, res) => {
    const id = req.params.id;
    const data = await taikhoanService.find({
      where: {
        id: id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.status(200).json(data);
  };

  // [POST] /TaiKhoans
  createTaiKhoan = async (req, res) => {
    const data = await taikhoanService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /TaiKhoans/:id
  updateTaiKhoan = async (req, res) => {
    const id = req.params.id;
    const data = await taikhoanService.update({
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

  // [DELETE] /TaiKhoans/:id
  deleteTaiKhoan = async (req, res) => {
    const id = req.params.id;

    const data = await taikhoanService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /Taikhoans/search
  searchTaikhoan = async (req, res) => {
    const searchString = req.query.q;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const data = await taikhoanService.search({
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

module.exports = new TaiKhoanController();
