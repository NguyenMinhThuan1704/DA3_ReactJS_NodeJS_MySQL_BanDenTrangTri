const express = require("express");
const router = express.Router();
const taikhoanController = require("../controllers/TaiKhoanController");

router.get("/", taikhoanController.getTaiKhoan);
router.post("/", taikhoanController.createTaiKhoan);
router.put("/:id", taikhoanController.updateTaiKhoan);
router.delete("/:id", taikhoanController.deleteTaiKhoan);

router.get("/id/:id", taikhoanController.getTaiKhoanByID);
router.get("/ltk", taikhoanController.getTaiKhoanAndLoaiTK);
router.get("/search", taikhoanController.searchTaikhoan);

router.post("/login", taikhoanController.login);
router.post("/logout", taikhoanController.logout);

module.exports = router;
