"use strict"

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);

// Handles 404 Errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") {
    console.error(err.stack);
  }
  
  const status = err.status || 500;
  const message = err.message;
  console.log(err.stack)

  return res.status(status).json({
    error: { message, status }
  });
});

module.exports = app;

