const express = require("express");
const { User } = require("../db");
const app = express.Router();

app.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
