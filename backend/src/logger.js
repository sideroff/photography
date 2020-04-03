class Logger {
  constructor() {
    this.signature = process.pid + ':\t'
  }

  log() {
    console.log.apply(console, [this.signature, ...arguments])
  }
}

let instance

function getInstance() {
  if (!instance) {
    instance = new Logger()
  }

  return instance
}

module.exports = getInstance()