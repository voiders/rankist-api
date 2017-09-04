const Log = require('log')
const log = new Log()

exports.notFound = function (result) {
  if (!result) {
    this.res.setHeader('Content-Type', 'application/json')
    // NOTE: which is the best response in this case?
    this.res.status(404).json({msg: 'not found'})
  }
  return result
}
exports.OK = function (result) {
  if (this.res.statusCode === 404) {
    return result
  }
  this.res.setHeader('Content-Type', 'application/json')
  this.res.status(200)
  this.res.json(result)
}

exports.serverError = function (err) {
  log.error('error', err)
  this.res.setHeader('Content-Type', 'application/json')
  this.res.status(500).json(err)
}

exports.created = function (result) {
  this.res.setHeader('Content-Type', 'application/json')
  this.res.status(201).json(result)
  return result
}
