const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getSingleBrand,
  getAllBrand,
} = require("../controllers/brandControl");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");

const router = express.Router();

router.post("/create-brand", authMiddleWare, isAdmin, createBrand);
router.put("/update-brand/:id", authMiddleWare, isAdmin, updateBrand);
router.delete("/delete-brand/:id", authMiddleWare, isAdmin, deleteBrand);
router.get("/brand/:id", getSingleBrand);
router.get("/brands", getAllBrand);
module.exports = router;
