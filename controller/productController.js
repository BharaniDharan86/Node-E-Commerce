const Product = require("../model/productModal");
exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  return res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};

exports.getProductById = async (req, res, next) => {
  const products = await Product.findById(req.params.id).populate({
    path: "userReviews",
  });
  return res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.createProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newProduct,
    },
  });
};

exports.updateProduct = async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(202).json({
    status: "success",
    data: {
      updatedProduct,
    },
  });
};

exports.deleteProduct = async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);

  return res.status(204);
};
