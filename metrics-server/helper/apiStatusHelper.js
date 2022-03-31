const MISSING_HEADERS = "Missing Authorization Header";
const UNAUTHORIZED_REQUEST = "Access Denied, Please try with correct credentials";
const NOT_FOUND = "not found";
const UNEXPECTED_ERROR = "UNEXPECTED ERROR";

const ERROR_STATUS_CODE = {
  BAD_REQUEST_CODE: 400,
  INTERNAL_SERVER_ERROR_CODE: 500,
  UNAUTHORIZED_REQUEST_CODE: 401,
  NOT_FOUND: 404,
  ALREADY_EXITS :409
}

const generateError = (error) => {
  console.log('Generating Error::', error)
  if (error.message && error.stack) {
    error = { message: error.message, stack: error.stack }
  }
  if (typeof error === "object") {
    error = JSON.stringify(error, 0, 4)
  }
  return error
}

module.exports = {
  ERROR_STATUS_CODE,
  UNAUTHORIZED_REQUEST,
  NOT_FOUND,
  MISSING_HEADERS,
  generateError,
}
