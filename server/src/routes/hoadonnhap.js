const express = require("express");
const router = express.Router();
const hoadonnhapController = require("../controllers/HoaDonNhapController");

router.get("/", hoadonnhapController.getHoaDonNhap);
router.post("/", hoadonnhapController.createHoaDonNhap);
router.put("/:id", hoadonnhapController.updateHoaDonNhap);
router.delete("/:id", hoadonnhapController.deleteHoaDonNhap);

router.get("/acc/:MaKH", hoadonnhapController.getHoaDonNhapByAcc);
router.get("/id/:id", hoadonnhapController.getHoaDonNhapByID);
router.get("/search", hoadonnhapController.searchHoaDonNhap);
router.post("/callHDNTK", hoadonnhapController.callProcHoaDonNhapThongKe);
module.exports = router;
