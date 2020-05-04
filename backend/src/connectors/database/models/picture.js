const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
  path: String,
  name: String,
  description: String,
});

module.exports = Picture;
