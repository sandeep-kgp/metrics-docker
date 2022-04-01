const db = require('../services/db')
const { get } = require('lodash')

const fetchUserTransactions = async(accountId) => {
  let client
  try {
    client = await db.getConnection()
    const sql = 'SELECT b.metric_name, b.return_type as metric_return_type, a.value_currentmonth as this_month,'
      + ' a.value_last_month as last_month, a.value_last_3months as last_3months, a.value_lifetime as life_time'
      + ' FROM fact_metrics_aggr a JOIN dim_metrics b ON a.metric_id = b.metric_id'
      + ' WHERE b.metric_id in (1,2,3,4,5,6,7,8,9,10,11,12) and report_dt = (select max(report_dt) from fact_metrics_aggr)'
      + ' AND a.account_id = ?'
    const [data, fields ]= await client.query(sql, [accountId])
    return data
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    // client.release()
  }
}

const fetchPlayerLastGame = async(accountId) => {
  let client
  try {
    client = await db.getConnection()
    const sql = 'SELECT game_name, last_played_date_time, bet_count, bet_real, bet_bonus, win_real, win_bonus, ggr, margin, rtp'
      + ' FROM f_player_last_game WHERE account_id = ?'
    const [data, fields]= await client.query(sql, [accountId])
    return data
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    // client.release()
  }
}

const fetchTopFavGames = async(accountId) => {
  let client
  try {
    client = await db.getConnection()
    const sql = 'SELECT segment_name as expired_bonuses FROM f_bo_segment_kpis_aggr'
      + ' WHERE metric_id = 12 AND account_id = ? ORDER BY count DESC'
    const [data, fields]= await client.query(sql, [accountId])
    return data
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    // client.release()
  }
}

const fetchExpiredBonuses = async(accountId) => {
  let client
  try {
    client = await db.getConnection()
    const sql = 'SELECT segment_name as bonus_name, amount as expired_bonus FROM f_bo_segment_kpis_aggr'
      + ' WHERE metric_id = 13 AND account_id = ? ORDER BY amount DESC'
    const [data, fields]= await client.query(sql, [accountId])
    return data
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    // client.release()
  }
}

module.exports = {
  fetchUserTransactions,
  fetchPlayerLastGame,
  fetchTopFavGames,
  fetchExpiredBonuses
}