const express = require("express");
const app = express();
const connectDB = require("./model/index");
const transactionRoutes = require("./routes/transactions");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cors = require("cors");
require("dotenv").config();


connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRoutes);
app.use(transactionRoutes);
app.use(authRoutes);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on ${PORT}`);
});
