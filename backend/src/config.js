const path = require('path')

const credentials = require('./credentials')

const environment = process.env.NODE_ENV || 'development'

module.exports = {
  isDev: environment == 'development',
  environment,
  webServer: {
    port: process.env.PORT || 3001,
    host: process.env.HOST,
    publicFolderPath: path.join(__dirname, '../public'),
    limits: {
                    //mb  kb     b
      fileUploadSize: 3 * 1024 * 1024
    }
  },
  dababase: {
    connectionString: `mongodb://${credentials.db.user}:${credentials.db.password}@ds129179.mlab.com:29179/photography`
  }
}