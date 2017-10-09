const r = require('rethinkdb')
const Promise = require('bluebird')
const Log = require('log')

const config = require('./env')

const log = new Log()

const { ReqlOpFailedError, ReqlDriverError, ReqlRuntimeError } = r.Error

const createTable = (table, conn) => r
  .tableCreate('lists')
  .run(conn)
  .then(log.info.bind(log))
  .catch(ReqlOpFailedError, err => {
    log.info(err.msg)
    return true
  })

const createDatabase = (db, conn) => r
  .dbCreate(db)
  .run(conn)
  .then(res => {
    log.info(res)
    conn.use(db)
    return conn
  })
  .catch(ReqlOpFailedError, err => {
    log.info(err.msg)
    return conn
  })

const useDatabase = (db, conn) => {
  conn.use(db)
  return conn
}

module.exports = (promise) => promise
  .then(conn => createDatabase(config.rethinkdb.db, conn))
  .then(conn => useDatabase(config.rethinkdb.db, conn))
  .then(conn => Promise.all([ // create tables
    createTable('lists', conn)
    // add here the next tables
  ]))
  .catch(ReqlRuntimeError, err => log.error('Create db Error', err))
  .catch(ReqlDriverError, err => log.error('Driver Error', err))
  .catch(err => {
    if (Array.isArray(err)) {
      err.forEach(log.error)
    } else {
      log.error('another error', err)
    }
  })
