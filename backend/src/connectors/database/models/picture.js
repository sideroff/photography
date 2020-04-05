const mongoose = require('mongoose')

const Picture = mongoose.model('Picture',
  {
    url: String,
    name: String,
    description: String,
  }
)

module.exports = Picture