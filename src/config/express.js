const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')

module.exports = function (app) {
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}
