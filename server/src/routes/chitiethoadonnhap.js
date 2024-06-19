const express = require("express");
const router = express.Router();
const chitiethoadonnhapController = require("../controllers/ChiTietHoaDonNhapController");

router.get("/", chitiethoadonnhapController.getChiTietHoaDonNhap);
router.post("/", chitiethoadonnhapController.createChiTietHoaDonNhap);
router.put("/:id", chitiethoadonnhapController.updateChiTietHoaDonNhap);
router.delete("/:id", chitiethoadonnhapController.deleteChiTietHoaDonNhap);

router.get(
  "/hdn/:MaHoaDonNhap",
  chitiethoadonnhapController.getChiTietHoaDonNhapByHoaDonNhap
);
router.get("/id/:id", chitiethoadonnhapController.getChiTietHoaDonNhapByID);
router.get("/search", chitiethoadonnhapController.searchChiTietHoaDonNhap);

module.exports = router;
