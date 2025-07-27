const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {onlyAdmin, authorizeRoles} = require("../middleware/authorize");
const{verifyToken} = require("../middleware/authMiddleware")

router.post("/",verifyToken,authorizeRoles("admin"),productController.addProduct);
router.get("/",productController.getAllProducts);
router.get("/search",productController.searchProducts);
router.put("/:id",verifyToken,authorizeRoles("admin"),productController.updateProduct)
module.exports = router;