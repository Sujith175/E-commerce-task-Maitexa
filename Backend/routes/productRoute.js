const express = require("express");
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControl");
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddleWare");
const router = express.Router();

router.post("/create-product", authMiddleWare, isAdmin, createProduct);
router.get("/product/:id", getSingleProduct);
router.get("/products", getAllProducts);
router.put("/update-product/:id", authMiddleWare, isAdmin, updateProduct);
router.delete("/delete-product/:id", authMiddleWare, isAdmin, deleteProduct);
module.exports = router;
