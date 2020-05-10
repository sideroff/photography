const crypto = require("crypto");

const cache = require("../connectors/cache");
const User = require("../connectors/database/models/user");
const logger = require("../logger");
const responses = require("../responses");

const genRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

const register = (req) => {
  return new Promise((resolve, reject) => {
    logger.log("register handler");
    const username = req.body && req.body.username;
    const password = req.body && req.body.password;
    logger.log("username, password", username, password);

    if (
      !username ||
      !password ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      return reject(
        responses.getResponse(
          responses.badRequest,
          "Please provide valid username and password."
        )
      );
    }
    logger.log("looking for user");

    let user = User.findOne({ username })
      .then((user) => {
        logger.log("user", JSON.stringify(user));
        if (user) {
          return reject(
            responses.getResponse(
              responses.badRequest,
              "A user with that username already exists."
            )
          );
        }

        const salt = genRandomString(128);
        const hash = crypto.createHash("sha256", salt);
        const hashedPassword = hash.update(password).digest("hex");

        const newUser = new User({
          username,
          password: hashedPassword,
          salt,
        });

        newUser
          .save()
          .then((response) => {
            resolve(
              responses.getResponse(
                responses.ok,
                `Successfully created user ${username}.`
              )
            );
          })
          .catch((error) => {
            logger.error(error);
            reject(
              responses.getResponse(
                responses.internalServerError,
                "Encountered a problem while trying to create the user."
              )
            );
          });
      })
      .catch((error) => {
        logger.error(error);

        reject(
          responses.getResponse(
            responses.internalServerError,
            "Encountered a problem while trying to validate the user."
          )
        );
      });
  });
};

const login = (req, res) => {
  return new Promise((resolve, reject) => {
    const username = req.body && req.body.username;
    const password = req.body && req.body.password;

    if (
      !username ||
      !password ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      return reject(
        responses.getResponse(
          responses.badRequest,
          "Please provide valid username and password."
        )
      );
    }

    let user = User.findOne({ username })
      .then((user) => {
        if (!user) {
          return reject(
            responses.getResponse(
              responses.badRequest,
              "We could not find a user with those credentials."
            )
          );
        }

        const hash = crypto.createHash("sha256", user.salt);
        const hashedPassword = hash.update(password).digest("hex");

        if (user.password !== hashedPassword) {
          return reject(
            responses.getResponse(
              responses.badRequest,
              "We could not find a user with those credentials."
            )
          );
        }

        // generate unique token
        const token = crypto
          .createHash("sha256")
          .update(user.username + Date.now().toString())
          .digest("hex");

        // save user to cache and resolve
        const session = {
          username: user.username,
          id: user._id,
          role: user._doc.role,
        };

        cache
          .setSession(token, session)
          .then(() => {
            res.cookie("token", token);
            res.cookie("role", session.role);
            resolve(
              responses.getResponse(responses.ok, {
                message: "Successfully logged in.",
                token,
                role: session.role,
              })
            );
          })
          .catch((error) => {
            reject(
              responses.getResponse(
                responses.badRequest,
                "Encountered a problem while trying to login."
              )
            );
          });
      })
      .catch((error) => {
        reject(
          responses.getResponse(
            responses.internalServerError,
            "Encountered a problem while trying to login."
          )
        );
      });
  });
};

module.exports = {
  post: [
    {
      route: "/api/auth/register",
      handler: register,
      requiredRole: 0,
    },
    {
      route: "/api/auth/login",
      handler: login,
      requiredRole: 0,
    },
  ],
};
