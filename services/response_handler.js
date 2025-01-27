class ResponseHandler {
    static send(res, { success, statusCode, token = null, error = null,  message, data = null }) {
      const responseBody = {
        success,
        statusCode,
        error,
        message,
        data,
      };
  
      if (token) {
        responseBody.token = token;
      }
  
      res.status(statusCode).json(responseBody);
    }
  }
  
  module.exports = ResponseHandler;
  