const Picture = require("../connectors/database/models/picture");
const logger = require("../logger");
const roles = require("../config").webServer.roles;

const create = (req, res, next) => {
  return Promise.resolve();
};

const del = (req, res, next) => {
  return Promise.reject();
};

module.exports = {
  post: [
    {
      route: "/api/picture/create",
      handler: create,
      requiredRole: roles.admin,
    },
    {
      route: "/api/picture/delete",
      handler: del,
      requiredRole: roles.admin,
    },
  ],
};
