const mongoose = require("mongoose");

const User = mongoose.model("Users", {
  username: String,
  password: String,
  salt: String,
});

module.exports = User;
