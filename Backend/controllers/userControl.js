const { generateToken } = require("../configuration/jwttoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//register user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    //create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

//login user
const checkLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.isPasswordMatched(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//fetch all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (error) {
    throw new Error(error);
  }
});

//fetch single User

const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await User.findById(id);
    res.json(singleUser);
  } catch (error) {
    throw new Error(error);
  }
});

//delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        email: req.body?.email,
        mobile: req.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  checkLogin,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
