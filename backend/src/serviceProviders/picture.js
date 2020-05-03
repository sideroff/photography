const Picture = require("../connectors/database/models/picture");
const logger = require("../logger");
const roles = require("../config").roles;

const create = (req, res, next) => {
  return Promise.resolve();
};

const del = (req, res, next) => {
  return Promise.reject();
};

module.exports = {
  post: [
    {
      route: "/api/picture",
      handler: create,
      requiredRole: roles.admin,
    },
  ],
  delete: [
    {
      route: "/api/picture/:id",
      handler: del,
      requiredRole: roles.admin,
    },
  ],
};
