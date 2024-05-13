const User = require('../models/user');
const Errorhandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const cloudinary = require("cloudinary");
const bcrypt = require('bcrypt');



const crypto = require("crypto");
  // Import Cloudinary v2
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
      public_id: result.public_id,
      url: result.secure_url,
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

// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect"));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//admin routes
// get all users => /api/v1/admin/users

exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});


// Get user details => /api/v1/admin/user/:id

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile   =>   /api/v1/admin/user/:Id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete user details => /api/v1/admin/user/:id

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  // Remove  avatar from cloudinary

  const image_id = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});

// Signin with google  auth controller=> /api/v1/google 

exports.google = catchAsyncErrors(async (req, res, next) => {
  // Destructure user data from the request body
  const { displayName, email, avatar } = req.body;

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      // Generate a random password for the new Google user
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // Create a new user document with the generated password
      user = await User.create({
        name: displayName,
        hashedPassword,
        email,
        avatar: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });
    }

    // Send back user data, including the role, and token in the response
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
});
