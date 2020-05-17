const mongoose = require("mongoose");

const User = mongoose.model("Users", {
  username: String,
  password: String,
  salt: String,
  role: Number,
});

module.exports = User;
