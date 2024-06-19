const express = require("express");
const router = express.Router();
const chitiethoadonbanController = require("../controllers/ChiTietHoaDonBanController");

router.get("/", chitiethoadonbanController.getChiTietHoaDonBan);
router.post("/", chitiethoadonbanController.createChiTietHoaDonBan);
router.put("/:id", chitiethoadonbanController.updateChiTietHoaDonBan);
router.delete("/:id", chitiethoadonbanController.deleteChiTietHoaDonBan);

router.get(
  "/order/:MaHoaDonBan",
  chitiethoadonbanController.getChiTietHoaDonBanByHoaDonBan
);
router.get("/id/:id", chitiethoadonbanController.getChiTietHoaDonBanByID);
router.get("/search", chitiethoadonbanController.searchChiTietHoaDonBan);

module.exports = router;
