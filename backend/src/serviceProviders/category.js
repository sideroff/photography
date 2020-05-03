const Category = require("../connectors/database/models/category");
const logger = require("../logger");
const responses = require("../responses");
const roles = require("../config").roles;

const getAll = (req) => {
  return new Promise((resolve, reject) => {
    Category.find({})
      .then((categories) => {
        resolve(responses.getResponse(responses.ok, categories));
      })
      .catch((error) => {
        reject(
          responses.getResponse(
            responses.internalServerError,
            "Encountered a problem while fetching categories."
          )
        );
      });
  });
};

const getById = (req) => {
  return new Promise((resolve, reject) => {
    const id = req.params && req.params.id;
    if (!id) {
      return reject(
        responses.getResponse(
          responses.badRequest,
          "Please provide a vaild category id."
        )
      );
    }

    Category.findById(id)
      .then((category) => {
        resolve(responses.getResponse(responses.ok, category));
      })
      .catch((error) => {
        reject(
          responses.getResponse(
            responses.internalServerError,
            "Encountered a problem while fetching category."
          )
        );
      });
  });
};

const create = (req) => {
  return new Promise((resolve, reject) => {
    const title = req.body && req.body.title;
    const description = req.body && req.body.description;
    const primaryImage = req.body && req.body.primaryImage;

    if (!title || !description || !primaryImage) {
      return reject(
        responses.getResponse(
          responses.badRequest,
          "Please provide valid category info."
        )
      );
    }

    Category.findOne({ title })
      .then((category) => {
        if (category) {
          return reject(
            responses.getResponse(
              responses.badRequest,
              "A category with that title already exists."
            )
          );
        }

        Category.create({
          title,
          description,
          primaryImage,
        })
          .then((response) => {
            resolve(
              responses.getResponse(
                responses.ok,
                `Successfully created category ${title}`
              )
            );
          })
          .catch((error) => {
            reject(
              responses.getResponse(
                badRequest,
                "A problem occured while trying to create the category."
              )
            );
          });
      })
      .catch((error) => {
        reject(
          responses.getResponse(
            badRequest,
            "A problem occured while trying to validate the category."
          )
        );
      });
  });
};

const del = (req) => {
  return new Promise((resolve, reject) => {
    const id = req.params && req.params.id;
    if (!id) {
      return reject(
        responses.getResponse(
          responses.badRequest,
          "Please provide a vaild category id."
        )
      );
    }

    Category.findByIdAndDelete(id)
      .then(() => {
        resolve(
          responses.getResponse(responses.ok, "Successfully deleted category.")
        );
      })
      .catch((error) => {
        reject(
          responses.getResponse(
            responses.badRequest,
            "Encountered a problem while deleting category."
          )
        );
      });
  });
};

module.exports = {
  get: [
    {
      route: "/api/category",
      handler: getAll,
      requiredRole: roles.guest,
    },
    {
      route: "/api/category/:id",
      handler: getById,
      requiredRole: roles.guest,
    },
  ],
  post: [
    {
      route: "/api/category",
      handler: create,
      requiredRole: roles.admin,
    },
  ],
  delete: [
    {
      route: "/api/category/:id",
      handler: del,
      requiredRole: roles.admin,
    },
  ],
};
