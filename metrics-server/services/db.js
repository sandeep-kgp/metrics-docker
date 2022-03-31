const { createPool } = require('mysql2')

const host = process.env.DB_HOST
const user = process.env.DB_USER 
const database = process.env.DB_NAME
const password = process.env.DB_PASSWORD
const port = process.env.DB_PORT

const dboptions_local = {
  user,
  host,
  database,
  password,
  port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

initializePool = () => {
  if (this.pool){
    return this.pool
  }
  this.pool = createPool(dboptions_local)

  this.pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
  return this.pool
}

getConnection = () => {
  const client = this.pool.promise()
  return client
}

module.exports = {
  initializePool,
  getConnection,
}
