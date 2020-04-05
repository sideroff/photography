const Picture = require('../connectors/database/models/picture')
const logger = require('../logger')

const create = (req, res, next) => {
  return Promise.resolve()
}

const del = (req, res, next) => {
  return Promise.reject()
}

module.exports = {
  create,
  delete: del
}