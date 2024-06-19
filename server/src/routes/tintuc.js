const express = require("express");
const router = express.Router();
const tintucController = require("../controllers/TinTucController");

router.get("/", tintucController.getTinTuc);
router.post("/", tintucController.createTinTuc);
router.put("/:id", tintucController.updateTinTuc);
router.delete("/:id", tintucController.deleteTinTuc);

router.get("/search", tintucController.searchTinTuc);

module.exports = router;
