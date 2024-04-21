const User = require('../models/user');
const Errorhandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

const crypto = require("crypto");
const cloudinary = require("cloudinary"); // Import Cloudinary v2
const { Console } = require('console');

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dutcqdnya",
  api_key: "361317831113384",
  api_secret: "XiDuG-0UyXwh2cj5EAfrE9jYvg4"
});

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // Upload avatar to Cloudinary
  
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });




  const { name, email, password } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      // public_id: result.public_id,
      // url: result.secure_url,
    },
  });

  // Send token
  sendToken(user, 200, res);
});

// Login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password are entered by user
  if (!email || !password) {
    return next(new Errorhandler('Please enter email and password', 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new Errorhandler('Invalid Email or Password', 401));
  }

  // Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new Errorhandler('Invalid Email or Password', 401));
  }

  // Send token
  sendToken(user, 200, res);
});

// Logout user => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Successfully logged out'
  });
});

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
});
