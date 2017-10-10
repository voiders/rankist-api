process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const config = {}

config.isDev = process.env.NODE_ENV === 'development'
config.isTest = process.env.NODE_ENV === 'test'

config.rethinkdb = {
  host: process.env.DB_HOST || config.isTest ? 'localhost' : 'rethinkdb',
  user: process.env.DB_USER || 'admin',
  db: process.env.DB_NAME || config.isTest ? 'rankist_test' : 'rankist',
  port: Number(process.env.DB_PORT) || 28015,
  password: process.env.DB_PASSWORD || ''
}

config.mysql = {
  host: process.env.DB_HOST || config.isTest ? 'localhost' : 'mysql',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || config.isTest ? 'rankist_test' : 'rankist',
  port: Number(process.env.DB_PORT) || 3306,
  password: process.env.DB_PASSWORD || config.isTest ? 'root' : 'root'
}

config.PORT = Number(process.env.PORT) || config.isTest ? undefined : 80
config.ROOT_PATH = path.join(__dirname, '..', '..')
config.FILES_PATH = path.join(config.ROOT_PATH, config.isTest ? 'files-test' : 'files')
config.secret = process.env.RANKIST_SECRET || 'super duper secret for rankist'

module.exports = config
