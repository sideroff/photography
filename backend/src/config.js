const path = require("path");

const credentials = require("./credentials");

const environment = process.env.NODE_ENV || "development";

module.exports = {
  isDev: environment == "development",
  environment,
  webServer: {
    port: process.env.PORT || 3001,
    host: process.env.HOST,
    publicFolderPath: path.join(__dirname, "../public"),
    limits: {
      //mb * kb * b = total allowed bytes
      fileUploadSize: 3 * 1024 * 1024,
      mimetypeWhitelist: ["image/jpeg", "image/png"],
    },
  },
  dababase: {
    connectionString: `mongodb://${
      process.env.DB_USER || credentials.db.user
    }:${
      process.env.DB_PASS || credentials.db.password
    }@ds129179.mlab.com:29179/photography`,
  },
  roles: {
    admin: 3,
    guest: 0,
  },
};
