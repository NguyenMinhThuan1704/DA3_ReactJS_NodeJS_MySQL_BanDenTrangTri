const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

router.get("/", cartController.getCart);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);
router.delete("/acc/:MaTaiKhoan", cartController.deleteCartByAcc);

router.get("/id/:id", cartController.getCartByID);
router.get("/acc/:MaTaiKhoan", cartController.getCartByAcc);
router.get("/search", cartController.searchCart);

module.exports = router;
