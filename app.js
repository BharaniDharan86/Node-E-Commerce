const express = require("express");
const app = express();
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const globalError = require("./controller/errorController");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello from the server");
});

app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/review", reviewRouter);

app.use(globalError);

module.exports = app;
