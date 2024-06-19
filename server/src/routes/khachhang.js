const express = require("express");
const router = express.Router();
const khachhangController = require("../controllers/KhachHangController");

router.get("/", khachhangController.getKhachHang);
router.post("/", khachhangController.createKhachHang);
router.put("/:id", khachhangController.updateKhachHang);
router.delete("/:id", khachhangController.deleteKhachHang);

router.get("/id/:id", khachhangController.getKhachHangByID);
router.get("/search", khachhangController.searchKhachHang);

module.exports = router;
