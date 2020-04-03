const logger = require('../../logger')

function initialize() {
  logger.log('database connection successfull')
  return Promise.resolve()
}

module.exports = {
  initialize
}