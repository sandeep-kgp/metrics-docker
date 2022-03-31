const APIError = require('../helper/constants/APIError')
const tokenModel = require('../db_model/tokenModel')
const { ERROR_STATUS_CODE, UNAUTHORIZED_REQUEST, MISSING_HEADERS } = require('../helper/apiStatusHelper')

const verifyBasicAuth = async (req, res, next) => {
  try {
    // check for basic auth header
    if (!req.headers.token) {
      next(new APIError(
        ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE,
        MISSING_HEADERS
      ))
      return res.status(401).json({ message: 'Missing Token Header' });
    }
    // verify token 
    const base64Credentials =  req.headers.authorization.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')
    let user
    if (username === 'Planner' && password === 'planner'){
      user = { id:1, name: 'Planner' }
    }
    if (!user) {
      next(new APIError(
        ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE,
        UNAUTHORIZED_REQUEST
      ))
    }
    // attach user to request object
    req.user = user
    next()
  } catch (err) {
    return next(
      new APIError(
        ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE,
        UNAUTHORIZED_REQUEST
      )
    )
  }
}

const verifyToken = async (req, res, next) => {
  try {
    // check for basic auth header
    if (!req.headers.token) {
      next(new APIError(
        ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE,
        MISSING_HEADERS
      ))
      return res.status(401).json({ message: 'Missing Token Header' })
    }
    // verify token 
    const valid = await tokenModel.isTokenValid(req.headers.token)
    if (!valid) {
      next(new APIError(
        ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE,
        UNAUTHORIZED_REQUEST
      ))
      return res.status(401).json({ message: 'Invalid Token' })
    }
    next()
  } catch (err) {
    return next(
      new APIError(
        ERROR_STATUS_CODE.UNAUTHORIZED_REQUEST_CODE,
        UNAUTHORIZED_REQUEST
      )
    )
  }
}

module.exports = {
  verifyBasicAuth,
  verifyToken
}
