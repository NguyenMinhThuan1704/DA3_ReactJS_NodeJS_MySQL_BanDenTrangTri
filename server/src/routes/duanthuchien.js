const express = require("express");
const router = express.Router();
const duanthuchienController = require("../controllers/DuAnThucHienController");

router.get("/", duanthuchienController.getDuAnThucHien);
router.post("/", duanthuchienController.createDuAnThucHien);
router.put("/:id", duanthuchienController.updateDuAnThucHien);
router.delete("/:id", duanthuchienController.deleteDuAnThucHien);

router.get("/search", duanthuchienController.searchDATH);

module.exports = router;
