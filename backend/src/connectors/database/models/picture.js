const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
  name: String,
  categoryId: String,
});

module.exports = Picture;
