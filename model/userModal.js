const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { use } = require("../app");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A User Must Have the userName"],
  },
  email: {
    type: String,
    unique: [true, "Please provide your email Id"],
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password Must Have 8 Characters"],
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: () => {
      validator: (val) => {
        return val === this.password;
      };
      message: "Password Doesn't Match";
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.checkPassword = async (userPassword, currPassword) => {
  return await bcrypt.compare(userPassword, currPassword);
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
