const express = require("express");
const { createUser } = require("../controllers/userControl");

const router = express.Router();

router.post("/user-register", createUser);

module.exports = router;
