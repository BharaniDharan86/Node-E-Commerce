const AppError = require("../utils/appError");

function handleJWTErr() {
  const message = `Invalid Token!!! Login Again`;
  return new AppError(message, 403);
}

function errProd(err, res) {
  return res.status(404).json({
    status: "Failed",
    message: err.message,
  });
}

module.exports = (err, req, res, next) => {
  let error = Object.create(err);

  if (error.name === "JsonWebTokenError") error = handleJWTErr(err);

  return errProd(error, res);
};
