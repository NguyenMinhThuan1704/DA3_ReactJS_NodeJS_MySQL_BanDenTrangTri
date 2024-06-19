const express = require("express");
const router = express.Router();
const loaisanphamController = require("../controllers/LoaiSanPhamController");

router.get("/", loaisanphamController.getLoaiSanPham);
router.post("/", loaisanphamController.createLoaiSanPham);
router.put("/:id", loaisanphamController.updateLoaiSanPham);
router.delete("/:id", loaisanphamController.deleteLoaiSanPham);

router.get("/id/:id", loaisanphamController.getLoaiSanPhamByID);
router.get("/search", loaisanphamController.searchLoaiSP);

module.exports = router;
