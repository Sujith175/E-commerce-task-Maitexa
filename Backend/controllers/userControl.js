const { generateToken } = require("../configuration/jwttoken");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoId");
const generateRefreshToken = require("../configuration/refreshToken");
const Product = require("../models/productModal");
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
    const refreshToken = await generateRefreshToken(user?.id);
    const updateUser = await User.findByIdAndUpdate(
      user.id,
      { refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
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

//admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorized");
  if (findAdmin.role !== "admin") throw new Error("Not Authorized");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin._id,
      firstName: findAdmin.firstName,
      lastName: findAdmin.lastName,
      email: findAdmin.email,
      mobile: findAdmin.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token");
  }
  const refreshToken = cookie.refreshToken;

  const user = await User.findOne({
    refreshToken,
  });
  if (!user) throw new Error("user Not Found:refreshToken Error");
  jwt.verify(refreshToken, process.env.JWTSECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Something Wrong with refresh token");
    }
    const accessToken = generateRefreshToken(user.id);
    res.json({ accessToken });
  });
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
  validateMongoDbId(id);
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
  validateMongoDbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
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

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User Blocked" });
  } catch (error) {
    throw new Error(error);
  }
});

const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User Unblocked" });
  } catch (error) {
    throw new Error(error);
  }
});

//logout

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({
    refreshToken,
  });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //forbidden
  }
  await User.findOneAndUpdate({ refreshToken, refreshToken: "" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});
//get wishlist
const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});
//save user address
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;

  validateMongoDbId(_id);
  let products = [];
  try {
    const user = await User.findById(_id);
    const existingCart = await Cart.findOne({ orderby: user._id });
    if (existingCart) {
      existingCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
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
};
