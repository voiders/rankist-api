const r = require('rethinkdb')
const request = require('supertest')
const config = require('../config/env')
const conn = require('../utils/connection')

let app
let req

exports.before = t => {
  app = require('../index')
  req = request(app)
  app.on('listened', () => t.end())
}

exports.beforeEach = t => {
  t.context.req = req
}

exports.afterAlways = t => conn.promise
  .then(conn => r.dbDrop(config.DB_NAME).run(conn))
  .then(t => app.get('server').close())
