const CustomAPIError = require('./CustomApi.js');

class BadRequestApi extends CustomAPIError {
  constructor(message) {
    super(message);

    this.statusCode = 500;
    // this.statusCode = StatusCode.BAD_REQUEST  if using StatusCode
  }
}

module.exports = BadRequestApi;
