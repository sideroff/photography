const logger = require("../../logger");

const cache = {};

function initialize() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      logger.log("cache connection has been made");
      resolve(cache);
    }, 500);
  });
}

function set(key, data) {
  return new Promise((resolve, reject) => {
    cache[key] = data;
    resolve(key);
  });
}

function get(key) {
  return new Promise((resolve, reject) => {
    resolve(cache[key]);
  });
}

module.exports = {
  initialize,
  set,
  get,
};
