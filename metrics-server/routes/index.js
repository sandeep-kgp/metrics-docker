const express = require('express')
const metricRouter = require('./MetricRouter').metricRouter
const tokenRouter = require('./TokenRouter').tokenRouter
const router = express.Router()

router.use('/v1/token', tokenRouter)
router.use('/v1/metrics', metricRouter)

module.exports = {
  router
}
