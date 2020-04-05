const Category = require('../connectors/database/models/category')
const logger = require('../logger')

const create = (categoryJSON) => {
  return new Promise((resolve, reject) => {
    let newCategory = new Category(categoryJSON)
    newCategory.save().then(response => {
      resolve(response.id)
    }).catch(error => {
      reject(error)
    })
  })
}

const del = (req, res, next) => {
  return Promise.reject()
}

module.exports = {
  create,
  delete: del
}