const redis = require("redis");

const config = require("../../config");
const logger = require("../../logger");

class Cache {
  initialize() {
    return new Promise((resolve, reject) => {
      this.client = redis.createClient(config.cache);

      this.client.on("ready", () => {
        logger.log("cache connection established successfully.");
        resolve();
      });

      this.client.on("error", (error) => {
        logger.log(
          `connection to cache could not be established ${JSON.stringify(
            error
          )}`
        );
        reject(error);
      });
    });
  }

  setSession(token, data) {
    return new Promise((resolve, reject) => {
      if (typeof data !== "string") {
        try {
          data = JSON.stringify(data);
        } catch (error) {
          data = data.toString();
        }
      }

      this.client.set(
        token,
        data,
        "EX",
        config.webServer.sessionTTL,
        (error, data) => {
          if (error) {
            return reject(error);
          }
          resolve();
        }
      );
    });
  }

  getSession(token) {
    return new Promise((resolve, reject) => {
      this.client.get(token, (error, session) => {
        if (error) {
          return reject(error);
        }
        resolve(session);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      logger.log(`connection to redis is getting closed voluntarily.`);

      this.client.quit((error) => {
        if (error) {
          return reject(error);
        }

        logger.log(`connection to redis has been closed voluntarily.`);
        resolve();
      });
    });
  }
}

let instance;

function getInstance() {
  if (!instance) {
    instance = new Cache();
  }

  return instance;
}

module.exports = getInstance();
