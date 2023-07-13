const express = require("express");
const {
  createUser,
  checkLogin,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
} = require("../controllers/userControl");
const router = express.Router();
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");

router.post("/user-register", createUser);

router.post("/check-login", checkLogin);
router.post("/login-admin", loginAdmin);
router.post("/cart", authMiddleWare, userCart);
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleWare, getWishList);
router.get("/usercart", authMiddleWare, getUserCart);
router.get("/:id", authMiddleWare, isAdmin, getSingleUser);

router.delete("/empty-cart", authMiddleWare, emptyCart);

router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleWare, updateUser);
router.put("/save-address", authMiddleWare, saveAddress);
router.put("/block-user/:id", authMiddleWare, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleWare, isAdmin, unBlockUser);

module.exports = router;
