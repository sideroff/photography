const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
  title: String,
  description: String,
  primaryImage: String,
});

module.exports = Category;
