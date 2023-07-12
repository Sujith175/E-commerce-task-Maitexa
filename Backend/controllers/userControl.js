const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    //create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // res.json({ msg: "User already exists", success: false });
    throw new Error("User Already Exists");
  }
});
module.exports = { createUser };
