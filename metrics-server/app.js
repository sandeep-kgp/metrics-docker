const express = require('express')
const db = require('./services/db')
const router = require('./routes').router
const APIError = require('./helper/constants/APIError')
const { ERROR_STATUS_CODE, NOT_FOUND } = require('./helper/apiStatusHelper')
const app = express()
const PORT = 8000

app.use(express.json())
app.use('/api', router)
app.use((req, res, next) => {
  next(new APIError(ERROR_STATUS_CODE.NOT_FOUND, 'Route '+ NOT_FOUND));
})
app.use('/', (req, res) => res.send('Health Ok'))
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      status: false,
      message: err.error.message,
    })
  } else {
    res.status(err.status || 500).send({ status: false, message: err.message })
  }
})

const startServer = async () => {
  try {
    db.initializePool()
    app.listen(PORT, console.info('Server started  and is running at port ', PORT));
  } catch (error) {
    console.error('Server Error:', error);
  }
}

startServer()
