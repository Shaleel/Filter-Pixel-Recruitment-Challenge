"use strict";
const express = require("express");
const createError = require("http-errors");
const ErrorHandler = require("./Middleware/ErrorHandler");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const database = require("./models/index");
const AuthRoutes = require("./routes/auth");
const ImageRoutes = require("./routes/images");
const isLoggedin = require("./Middleware/isLoggedin");
require("dotenv").config();
app.use(cors());
app.use(express.json());

//db-connection
database.sequelize
  .authenticate()
  .then(() => console.log("Connected to Database..."))
  .catch((err) => console.log(err));

database.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Db Synced");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(AuthRoutes);
app.use("/images", cors(), isLoggedin, ImageRoutes);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
