const express = require("express");
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  uploadImages,
} = require("../controllers/productControl");
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddleWare");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/create-product", authMiddleWare, isAdmin, createProduct);
router.get("/product/:id", getSingleProduct);
router.get("/products", getAllProducts);
router.put("/update-product/:id", authMiddleWare, isAdmin, updateProduct);
router.delete("/delete-product/:id", authMiddleWare, isAdmin, deleteProduct);
router.put("/wishlist", authMiddleWare, addToWishList);
router.put(
  "/upload/:id",
  authMiddleWare,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
module.exports = router;
