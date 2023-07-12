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
} = require("../controllers/userControl");
const router = express.Router();
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");

router.post("/user-register", createUser);

router.post("/check-login", checkLogin);

router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleWare, isAdmin, getSingleUser);

router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleWare, updateUser);

router.put("/block-user/:id", authMiddleWare, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleWare, isAdmin, unBlockUser);

module.exports = router;
