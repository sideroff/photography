
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const config = require('./config')
const logger = require('./logger')
const db = require('./connectors/database')
const serviceProviders = require('./serviceProviders')


function addMiddlewares(app) {
  logger.log('adding middleware')

  // parse any url params
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // parse json body
  app.use(bodyParser.json())

  // hande file uploads
  app.use(fileUpload({
    limits: {
      fileSize: config.webServer.limits.fileUploadSize
    }
  }))

  // log requests
  app.use((req, res, next) => {
    logger.log(req.method + ' ' + req.url)
    next()
  })

  app.use(express.static(config.webServer.publicFolderPath))

  logger.log('public folder: ' + config.webServer.publicFolderPath)
}

function addRouting(app) {
  app.get('/', (req, res) => res.send('Hello World!'))

  app.post('/api/category', (req, res, next) => {
    serviceProviders.category.create(req.body || {}).then(response => {
      res.send(response)
    }).catch(error => {
      logger.log(`picture serviceProvider threw an error ${JSON.stringify(error)}`)
    })
  })

  app.post('/api/picture', (req, res, next) => {
    serviceProviders.picture.create().then(response => {
      res.send(response)
    }).catch(error => {
      logger.log(`picture serviceProvider threw an error ${JSON.stringify(error)}`)
    })
  })

  app.delete('/api/picture/:id', (req, res, next) => {
    serviceProviders.picture.delete().then(response => {
      res.send(response)
    }).catch(error => {
      logger.log(`picture serviceProvider threw an error ${JSON.stringify(error)}`)
    })
  })

  app.get('/api/categories', (req, res) => {
    const categories = [
      'nature',
      'sea',
      'urban',
      'sunsets'
    ]

    res.send(categories)
  })

  app.get('/api/users/:id', (req, res) => {
    res.send(JSON.stringify({ username: 'test' }))
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
}

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()

    addMiddlewares(app)
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

function setup() {
  const promises = []

  promises.push(db.initialize())
  promises.push(initialize())

  Promise.all(promises).then(results => {
    logger.log(`application has been initialized successfully`)
  }).catch(error => {
    logger.log(`application has encountered an error ${JSON.stringify(error)}`)

    let closePromises = []

    Promise.all(closePromises).then(() => {
      logger.log("Application shut down gracefully.")
      process.kill(process.pid, 0)
    }).catch(error => {
      logger.log("application encountered a problem while shutting down. ", JSON.stringify(error))
      process.kill(process.pid, 0)
    })
  })
}

setup()