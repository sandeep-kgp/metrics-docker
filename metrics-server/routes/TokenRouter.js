const express = require('express')
const controller = require('../controllers/TokenController')

const tokenRouter = express.Router()

tokenRouter.post('/', controller.createToken)

module.exports = {
  tokenRouter
}