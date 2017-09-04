const Joi = require('joi')
const r = require('rethinkdb')
const Promise = require('bluebird')
// const Log = require('log')

const conn = require('../../utils/connection').connection
const validator = require('../../utils/validate').validator

// const log = new Log()

// TODO: add forbidden keys
const listSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(4).required(),
  deleted: Joi.bool().default(false)
})

const toArray = cursor => cursor.toArray()

const validate = validator(listSchema)

exports.insert = list => Promise
  .resolve(list)
  .then(list => validate(list))
  .then(data => r.table('lists').insert(data).run(conn))

exports.update = (id, list) => Promise
  .resolve(list)
  .then(list => validate(list))
  .then(data => r.table('lists').get(id).update(data).run(conn))

exports.delete = list => Promise
  .resolve(list)
  .then(list => validate(list))
  .then(data => r.table('lists').update(data).run(conn))

exports.findById = id => r
  .table('lists')
  .get(id)
  .run(conn)

exports.find = query => r
  .table('lists')
  .filter(query)
  .run(conn)
  .then(toArray)
