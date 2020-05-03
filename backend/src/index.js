const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const config = require("./config");
const logger = require("./logger");
const db = require("./connectors/database");
const cache = require("./connectors/cache");
const serviceProviders = require("./serviceProviders");

function addMiddlewares(app) {
  logger.log("adding middleware");

  // support parsing of application/json type post data
  app.use(bodyParser.json());

  //support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(config.webServer.publicFolderPath));

  logger.log("public folder: " + config.webServer.publicFolderPath);
}

function addRouting(app) {
  logger.log("adding routing");
  const providers = Object.values(serviceProviders);

  // go through each provider
  providers.forEach((provider) => {
    const methods = Object.keys(provider);
    // then for each method they have configured
    methods.forEach((method) => {
      // then for each service in that method
      provider[method].forEach((service) => {
        // attach that service with that method to the router
        logger.log(
          `\tattaching ${method.toUpperCase()} ${service.route} to router`
        );
        app[method](service.route, (req, res) => {
          logger.log(`${method.toUpperCase()} ${service.route}`);
          service
            .handler(req, res)
            .then((response) => {
              res.status(response.status || 200);
              res.send(response);
            })
            .catch((error) => {
              logger.log("server error response received");
              if (error && error.status && error.data) {
                // check if error is already user friendly

                res.status(error.status);
                res.send(error);
              } else {
                // error is not user friendly => log and throw 500
                logger.log(
                  "unfriendly error received by server: ",
                  JSON.stringify(error)
                );
              }
            });
        });
      });
    });
  });

  logger.log("\tattaching  GET * to router\n");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();

    addMiddlewares(app);
    addRouting(app);

    app.on("error", (error) => {
      logger.log(`web server encountered an error: ${JSON.stringify(error)}`);
      reject(error);
    });

    app.listen(config.webServer.port, () => {
      logger.log(
        `server listening on ${config.webServer.host || "localhost"}:${
          config.webServer.port
        }`
      );
      resolve(app);
    });
  });
}

function setup() {
  const promises = [];

  promises.push(db.initialize());
  promises.push(cache.initialize());
  promises.push(initialize());

  Promise.all(promises)
    .then((results) => {
      logger.log(`application has been initialized successfully`);
    })
    .catch((error) => {
      logger.log(
        `application has encountered an error ${JSON.stringify(error)}`
      );

      let closePromises = [];

      Promise.all(closePromises)
        .then(() => {
          logger.log("Application shut down gracefully.");
          process.kill(process.pid, 0);
        })
        .catch((error) => {
          logger.log(
            "application encountered a problem while shutting down. ",
            JSON.stringify(error)
          );
          process.kill(process.pid, 0);
        });
    });
}

setup();
