class CustomErrorApi extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomErrorApi(msg, statusCode);
};
module.exports = {
  CustomErrorApi,
  createCustomError,
};
