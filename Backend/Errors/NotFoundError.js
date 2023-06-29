const  CustomAPIError = require('./CustomApi.js')

class NotFoundError extends CustomAPIError {
    constructor(message) {
      super(message);
  
      this.statusCode =  500;
      // this.statusCode = StatusCode.BAD_REQUEST  if using StatusCode
    }
  }

  module.exports = NotFoundError;