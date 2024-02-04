const express = require("express");
const { protect } = require("../controller/authController");

const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
} = require("../controller/productController");
const productRouter = express.Router();

productRouter.route("/").get(protect, getAllProducts).post(createProduct);

productRouter
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = productRouter;
