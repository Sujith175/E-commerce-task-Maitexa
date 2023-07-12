const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
  getAllCategory,
} = require("../controllers/categoryControl");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");

const router = express.Router();

router.post("/create-category", authMiddleWare, isAdmin, createCategory);
router.put("/update-category/:id", authMiddleWare, isAdmin, updateCategory);
router.delete("/delete-category/:id", authMiddleWare, isAdmin, deleteCategory);
router.get("/category/:id", getSingleCategory);
router.get("/categories", getAllCategory);
module.exports = router;
