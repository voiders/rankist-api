const r = require('rethinkdb')
const config = require('../config/env')

const promise = r.connect({
  host: config.DB_HOST,
  port: config.DB_PORT,
  name: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PASSWORD
})

exports.promise = promise.then(conn => {
  exports.connection = conn
  conn.use(config.DB_NAME)
  return conn
})
