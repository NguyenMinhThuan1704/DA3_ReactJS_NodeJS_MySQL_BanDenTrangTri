const express = require("express");
const router = express.Router();
const nhaphanphoiController = require("../controllers/NhaPhanPhoiController");

router.get("/", nhaphanphoiController.getNhaPhanPhoi);
router.post("/", nhaphanphoiController.createNhaPhanPhoi);
router.put("/:id", nhaphanphoiController.updateNhaPhanPhoi);
router.delete("/:id", nhaphanphoiController.deleteNhaPhanPhoi);

router.get("/id/:id", nhaphanphoiController.getNhaPhanPhoiByID);
router.get("/search", nhaphanphoiController.searchNPP);

module.exports = router;
