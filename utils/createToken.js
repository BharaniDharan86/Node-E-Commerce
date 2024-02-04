const jwt = require("jsonwebtoken");

const createJWTToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);

  return token;
};

module.exports = createJWTToken;
