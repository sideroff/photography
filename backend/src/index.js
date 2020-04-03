
const express = require('express')
const config = require('./config')
const logger = require('./logger')
const db = require('./connectors/database')

function addRouting(app) {
  app.get('/', (req, res) => res.send('Hello World!'))

  app.get('/api/users/:id', (req, res) => {
    res.send(JSON.stringify({username: 'test'}))
  })

}

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()

    addRouting(app)

    app.on('error', error => {
      logger.log(`web server encountered an error: ${JSON.stringify(error)}`)
      reject(error)
    })

    app.listen(config.webServer.port, () => {
      logger.log(`server listening on ${config.webServer.host || 'localhost'}:${config.webServer.port}`)
      resolve(app)
    })
  })
}

const promises = []

promises.push(db.initialize())
promises.push(initialize())

Promise.all(promises).then(results => {
  logger.log(`application has been initialized successfully`)
}).catch(error => {
  logger.log(`application has encountered an error ${JSON.stringify(error)}`)

  let closePromises = []

  closePromises.push(db.close())

  Promise.all(closePromises).then(() => {
    logger.log("Application shut down gracefully.")
    process.kill(process.pid, 0)
  }).catch(error => {
    logger.log("application encountered a problem while shutting down. ", JSON.stringify(error))
    process.kill(process.pid, 0)
  })
})