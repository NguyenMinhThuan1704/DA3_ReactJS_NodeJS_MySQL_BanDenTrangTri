const express = require("express");
const router = express.Router();
const loaitaikhoanController = require("../controllers/LoaiTaiKhoanController");

router.get("/", loaitaikhoanController.getLoaiTaiKhoan);
router.post("/", loaitaikhoanController.createLoaiTaiKhoan);
router.put("/:id", loaitaikhoanController.updateLoaiTaiKhoan);
router.delete("/:id", loaitaikhoanController.deleteLoaiTaiKhoan);

router.get("/id/:id", loaitaikhoanController.getLoaiTaiKhoanByID);
router.get("/search", loaitaikhoanController.searchLoaiTK);

module.exports = router;
