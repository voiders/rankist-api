const express = require('express')
const config = require('./config/env')
const Log = require('log')
const log = new Log()

const app = express()

require('./config/express.js')(app)

app.use('/api/', require('./routes'))

const port = config.PORT
const server = app.listen(port, function () {
  const host = server.address().address
  const port = server.address().port
  log.info(`Run http:${host}:${port}`)
  app.set('address', `http:${host}:${port}`)
  app.set('port', port)
  app.set('server', server)
})

module.exports = app
