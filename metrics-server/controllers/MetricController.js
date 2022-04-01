const metricsModel = require('../db_model/metricsModel')

const getUserTransactions = async(req, resp) => {
  let { accountId } = req.query
  console.info(`Getting metrics for account:: ${accountId}`)
  try {
    const metrics = await metricsModel.fetchUserTransactions(accountId)
    resp.status(200).send(metrics)
  } catch (e) {
    console.error(e)
    resp.status(500).send({ error: 'Error occurred in getting mettrics' })
  }
}

const getTopFavGames = async(req, resp) => {
  let { accountId } = req.query
  console.info(`Getting metrics for account:: ${accountId}`)
  try {
    const metrics = await metricsModel.fetchTopFavGames(accountId)
    resp.status(200).send(metrics)
  } catch (e) {
    console.error(e)
    resp.status(500).send({ error: 'Error occurred in getting mettrics' })
  }
}

const getExpiredBonuses = async(req, resp) => {
  let { accountId } = req.query
  console.info(`Getting metrics for account:: ${accountId}`)
  try {
    const metrics = await metricsModel.fetchExpiredBonuses(accountId)
    resp.status(200).send(metrics)
  } catch (e) {
    console.error(e)
    resp.status(500).send({ error: 'Error occurred in getting mettrics' })
  }
}

const getPlayerLastGame = async(req, resp) => {
  let { accountId } = req.query
  console.info(`Getting metrics for account:: ${accountId}`)
  try {
    const metrics = await metricsModel.fetchPlayerLastGame(accountId)
    resp.status(200).send(metrics)
  } catch (e) {
    console.error(e)
    resp.status(500).send({ error: 'Error occurred in getting mettrics' })
  }
}

module.exports = {
  getUserTransactions,
  getTopFavGames,
  getPlayerLastGame,
  getExpiredBonuses
}
