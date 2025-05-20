const express = require("express");
const router = express.Router();
const danhgiaController = require("../controllers/DanhGiaController");

router.get("/", danhgiaController.getDanhGia);
router.post("/", danhgiaController.createDanhGia);
router.put("/:id", danhgiaController.updateDanhGia);
router.delete("/:id", danhgiaController.deleteDanhGia);

router.get("/cate/:MaSanPham", danhgiaController.getDanhGiaByProduct);
router.get("/id/:id", danhgiaController.getDanhGiaByID);
router.get("/search", danhgiaController.searchDanhGia);
module.exports = router;
