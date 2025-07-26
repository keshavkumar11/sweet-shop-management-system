const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {onlyAdmin} = require("../middleware/authorize");
const{verifyToken} = require("../middleware/authMiddleware")

router.post("/",verifyToken,onlyAdmin,productController.addProduct);

module.exports = router;