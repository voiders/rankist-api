process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const config = {}
config.DB_HOST = process.env.DB_HOST || 'localhost'
config.DB_USER = process.env.DB_USER || 'admin'
config.DB_NAME = process.env.DB_NAME || 'rankist'
config.DB_PORT = Number(process.env.DB_PORT) || 28015
config.DB_PASSWORD = process.env.DB_PASSWORD || ''

config.PORT = Number(process.env.PORT) || 8080
config.isDev = process.env.NODE_ENV === 'development'
config.isTest = process.env.NODE_ENV === 'test'
config.ROOT_PATH = path.join(__dirname, '..', '..')
config.FILES_PATH = path.join(config.ROOT_PATH, config.isTest ? 'files-test' : 'files')
config.secret = process.env.RANKIST_SECRET || 'super duper secret for rankist'

module.exports = config
