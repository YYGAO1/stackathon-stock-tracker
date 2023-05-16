const express = require("express");
const app = express.Router();
const { Stock } = require("../db");
const { isLoggedIn } = require("./middleware");

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.getWatchlist());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.addToWatchlist(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/edit/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.updateStock(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.removeFromWatchList(req.body));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
