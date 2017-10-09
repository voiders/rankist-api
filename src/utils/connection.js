const r = require('rethinkdb')
const mysql = require('mysql')
const Promise = require('bluebird')

const config = require('../config/env')

global.console.log(config)
const promise = r.connect(config.rethinkdb)

exports.promise = promise.then(conn => {
  exports.connection = conn
  conn.use(config.rethinkdb.DB_NAME)
  return conn
})

exports.conn = mysql.createConnection(config.mysql)

exports.query = Promise.promisify(exports.conn.query)

exports.getProperties = (obj, properties) => properties.map(key => obj[key])

exports.conn.connect((err) => {
  if (err) {
    global.console.error('error connecting: ' + err.stack)
  }
})
