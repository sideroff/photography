const mongoose = require('mongoose')

const Category = mongoose.model('Category',
  {
    name: String,
    description: String,
    primaryImage: String,
  }
)

module.exports = Category
