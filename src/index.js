const express = require('express')
const config = require('./config/env')
const getPort = require('get-port')
const Log = require('log')
const log = new Log()
const connection = require('./utils/connection')
const app = express()

log.info('Server starting')

require('./config/express.js')(app)
require('./config/db')(connection.promise)
  .then(() => {
    if (!config.PORT) {
      return getPort()
    }
    return config.PORT
  })
  .then(start)

function start (port) {
  app.use('/api/', require('./routes'))
  const server = app.listen(port, function () {
    const host = server.address().address
    const port = server.address().port
    log.info(`Run http:${host}:${port}`)
    app.set('address', `http:${host}:${port}`)
    app.set('port', port)
    app.set('server', server)
    app.emit('listened', null)
  })
}

module.exports = app
