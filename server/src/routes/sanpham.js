const express = require("express");
const router = express.Router();
const sanphamController = require("../controllers/SanPhamController");

router.get("/", sanphamController.getSanPham);
router.post("/", sanphamController.createSanPham);
router.put("/:id", sanphamController.updateSanPham);
router.delete("/:id", sanphamController.deleteSanPham);

router.get("/cate/:MaLoaiSanPham", sanphamController.getSanPhamByCategory);
router.get("/id/:id", sanphamController.getSanPhamByID);
router.get("/search", sanphamController.searchSanPham);
router.get("/callProcDay", sanphamController.callProcDay);
router.get("/callProcWeek", sanphamController.callProcWeek);
router.get("/callProcMonth", sanphamController.callProcMonth);
router.get("/callProcYear", sanphamController.callProcYear);
router.post("/callTKSP", sanphamController.callProcThongKeSP);
module.exports = router;
