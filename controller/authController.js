const User = require("../model/userModal");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const createJWTToken = require("../utils/createToken");
const { promisify } = require("util");
const { catchAsync } = require("../utils/catchAsync");

//sign up new user
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  if (!newUser) next(new AppError("User Not Found Something Went Wrong", 404));

  const token = createJWTToken(newUser._id);

  return res.status(201).json({
    status: "success",
    message: "User Signed Up Successfully",
    token,
  });
});

//logging in the user
exports.login = catchAsync(async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password)
    next(new AppError("Please provide Email and password", 400));

  const currentUser = await User.findOne({ email });

  if (!currentUser) return next(new AppError("Email Not Found", 404, "failed"));

  const isValidPassword = await currentUser.checkPassword(
    password,
    currentUser.password
  );

  if (!isValidPassword)
    return next(new AppError("invalid Email and password", 400, "failed"));

  const token = createJWTToken(currentUser._id);

  return res.status(200).json({
    status: "success",
    token,
    message: "User Verified",
  });
});

//protecting the unauthorised user

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //if the token doesnt exists send the error
  if (!token) return next(new AppError("You're not loged in", 404, "failed"));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) return next(new AppError("Failed", 401, "failed"));
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) return next(new AppError("Invalid token", 404, "failed"));

  req.user = freshUser;

  next();
});
