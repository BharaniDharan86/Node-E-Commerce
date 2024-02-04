const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DBURL)
  .then((con) => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log("Error Connecting DB🔥");
  });

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 3000");
});
