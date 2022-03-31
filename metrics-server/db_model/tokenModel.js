const { get } = require('lodash')
const crypto = require('crypto')
const db = require('../services/db')

exports.createRandomToken = function (string) {
  var seed = crypto.randomBytes(20)
  return crypto.createHash('abcde').update(seed + string).digest('hex')
}

const generateToken = async() => {
  let client
  try {
    const token = createRandomToken('test')
    client = await db.getConnection()
    const sql = 'INSERT INTO tokens (token) VALUES(?)'
    const data = await client.query(sql, [token])
    console.log(data)
    return data.rows
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    // client.release()
  }
}

const isTokenValid = async(token) => {
  let client
  try {
    client = await db.getConnection()
    const sql = 'SELECT 1 FROM tokens WHERE token = ?'
    const [data, fields] = await client.query(sql, [token])
    return data.length > 0
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    // client.release()
  }
}

module.exports = {
  generateToken,
  isTokenValid
}