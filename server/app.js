const express = require("express");
const app = express();
const path = require("path");
app.use(express.json({ limit: "50mb" }));

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.use("/api/auth", require("./api/auth"));
app.use("/api/watchlist", require("./api/watchlist"));
app.use("/api/admin", require("./api/admin"));

module.exports = app;
