let express = require("express");
let router = express.Router();

module.exports.displayHomepage = (req, res, next) => {
  res.render("index", { title: "Home" });
};