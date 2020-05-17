const Picture = require("../connectors/database/models/picture");
const Category = require("../connectors/database/models/category");
const logger = require("../logger");
const config = require("../config");
const roles = config.roles;
const responses = require("../responses");
const fileUploadSize = config.webServer.limits.fileUploadSize;
const publicFolderPath = config.webServer.publicFolderPath;
const mimetypeWhitelist = config.webServer.limits.mimetypeWhitelist;
const fileUpload = require("express-fileupload");
const fs = require("fs");

const create = (req) => {
  return new Promise((resolve, reject) => {
    const category = req.body && req.body.category;
    const pictureFile = req.files && req.files.pictureFile;
    const name =
      req.files && req.files.pictureFile && req.files.pictureFile.name;

    if (!name || typeof name != "string" || name.length <= 4) {
      return reject(
        responses.getResponse(
          responses.badRequest,
          "Please provide a picture with a valid name."
        )
      );
    }

    if (!category || typeof category != "string") {
      return reject(
        responses.getResponse(
          responses.badRequest,
          "Please provide a valid picture category."
        )
      );
    }

    if (!req.files || !req.files.pictureFile) {
      return reject(
        responses.getResponse(
          responses.badRequest,
          "Please provide a valid picture file."
        )
      );
    }

    if (!mimetypeWhitelist.includes(req.files.pictureFile.mimetype)) {
      return reject(
        responses.getResponse(
          responses.badRequest,
          `Picture file mimetype not supported. Supported mimetypes:
          ${allowedUploadMimetypes.join(", ")}.`
        )
      );
    }

    Category.findById(category)
      .then(() => {
        if (!category) {
          return reject(
            responses.getResponse(
              responses.badRequest,
              "Could not find the specified category"
            )
          );
        }

        const filePath = `${publicFolderPath}/${req.files.pictureFile.name}`;

        fs.access(filePath, fs.F_OK, (err) => {
          if (!err) {
            // file exists
            return reject(
              responses.getResponse(
                responses.badRequest,
                "A file with that name already exists."
              )
            );
          }

          Promise.all([
            Picture.create({ name, categoryId: category }),
            pictureFile.mv(filePath),
          ])
            .then((result) => {
              logger.log("result", typeof result);

              resolve(
                responses.getResponse(
                  responses.ok,
                  `Successfully uploaded picture ${name}`
                )
              );
            })
            .catch((error) => {
              logger.log("error while uploading", error.message);

              reject(
                responses.getResponse(
                  responses.internalServerError,
                  "Encountered a problem while saving your picture."
                )
              );
            });
        });
      })
      .catch((error) => {
        return reject(
          responses.getResponse(
            responses.badRequest,
            "Encountered a problem while verifying your request."
          )
        );
      });
  });
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
      middleware: fileUpload({
        limits: { fileSize: fileUploadSize },
        useTempFiles: true,
        tempFileDir: "/tmp/",
      }),
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
