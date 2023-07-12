const express = require("express");
const {
  createUser,
  checkLogin,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../controllers/userControl");

const router = express.Router();

router.post("/user-register", createUser);

router.post("/check-login", checkLogin);

router.get("/all-users", getAllUsers);

router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
module.exports = router;
