const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const controller = require('../controllers/MetricController')

const metricRouter = express.Router()

metricRouter.get('/UserTransactions', authMiddleware.verifyToken, controller.getUserTransactions)
metricRouter.get('/TopFavGames', authMiddleware.verifyToken, controller.getTopFavGames)
metricRouter.get('/PlayerLastGame', authMiddleware.verifyToken, controller.getPlayerLastGame)
module.exports = {
  metricRouter
}