const express = require("express");
const { postReview, readReview } = require("../controller/reviewController");
const reviewRoutes = express.Router();

reviewRoutes.route("/").get(readReview).post(postReview);

module.exports = reviewRoutes;
