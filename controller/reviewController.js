const Review = require("../model/reviewModal");

exports.readReview = async (req, res, next) => {
  const review = await Review.find().populate({
    path: "product",
  });

  return res.status(200).json({
    review,
  });
};

exports.postReview = async (req, res, next) => {
  const review = await Review.create(req.body);

  return res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
};
