const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
