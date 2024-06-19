const express = require("express");
const router = express.Router();
const hoadonbanController = require("../controllers/HoaDonBanController");

router.get("/", hoadonbanController.getHoaDonBan);
router.post("/", hoadonbanController.createHoaDonBan);
router.put("/:id", hoadonbanController.updateHoaDonBan);
router.delete("/:id", hoadonbanController.deleteHoaDonBan);

router.get("/acc/:MaKH", hoadonbanController.getHoaDonBanByAcc);
router.get("/id/:id", hoadonbanController.getHoaDonBanByID);
router.get("/search", hoadonbanController.searchHoaDonBan);
router.post("/callHDBTK", hoadonbanController.callProcHoaDonBanThongKe);

module.exports = router;
