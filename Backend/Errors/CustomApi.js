
class CustomAPIError extends Error {
    constructor(message) {
      super(message);
  
      this.statusCode = 400 ;
      // this.statusCode = StatusCode.BAD_REQUEST  if using StatusCode
    }
  }

  module.exports = CustomAPIError;