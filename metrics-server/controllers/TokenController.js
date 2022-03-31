const tokenModel = require('../db_model/tokenModel')

const createToken = async(req, resp) => {
  let { eventsData } = req.body
  console.info(`Acknowledge API being called:: ${JSON.stringify(eventsData)}`)
  try {
    const token = await tokenModel.generateToken()
    resp.status(200).send({ token, message: 'Token generated' })
  } catch (e) {
    console.error(e)
    resp.status(500).send({ error: 'Error occurred in Acknowleding' })
  }
}

module.exports = {
  createToken
}
