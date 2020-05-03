module.exports = {
  getResponse: (response, data) => {
    return Object.assign({}, response, { data });
  },
  ok: {
    status: 200,
    data: "OK",
  },
  internalServerError: {
    status: 500,
    data: "Internal server error",
  },
  badRequest: {
    status: 400,
    data: "Bad Request",
  },
  unautharized: {
    status: 401,
    data: "Unautharized",
  },
};
