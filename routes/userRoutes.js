const express = require("express");
const { signUp, login } = require("../controller/authController");
const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);

module.exports = userRouter;
