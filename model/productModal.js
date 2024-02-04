const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "A Product Must have name"],
  },
  price: {
    type: Number,
    required: [true, "A Product must have a price"],
    default: 0,
  },
  category: {
    type: String,
    required: [true, "A Product Should be in any one category"],
  },
  description: {
    type: String,
    required: [true, "A Product Must have a description"],
  },
  reviews: {
    type: String,
    required: [true, "A Product Must have the reviews"],
  },
  ratings: {
    type: Number,
    required: [true, "A Product Must have the ratings"],
  },
  images: {
    type: String,
    required: [true, "A Product Must have the images"],
  },
});

productSchema.virtual("userReviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
