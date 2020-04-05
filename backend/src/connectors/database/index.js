const mongoose = require('mongoose')

const config = require('../../config')
const logger = require('../../logger')

function initialize() {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.dababase.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(connection => {
      logger.log('database connection has been made')
      resolve(connection)
    }).catch(error => {
      logger.log(`database initialization problem has occured: ${JSON.stringify(error)}`)
      reject(error)
    })
  })
}

module.exports = {
  initialize
}