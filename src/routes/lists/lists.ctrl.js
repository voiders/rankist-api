const Promise = require('bluebird')
const response = require('../../utils/response')
const model = require('./lists.mdl.js')

const findByName = name => list => list('name').match(name).and(list('deleted').eq(false))

// NOTE: Should it filter always the deleted lists?
// TODO: remove `deleted` row in getOne and getPublic end points

exports.post = (req, res) => Promise
  .bind({req, res})
  .then(() => model.insert(req.body))
  .then(response.created)
  .catch(response.serverError)

exports.getOne = (req, res) => Promise
  .bind({req, res})
  .then(() => model.findById(req.params.id))
  .then(response.notFound)
  .then(response.OK)
  .catch(response.serverError)

exports.getPublic = (req, res) => Promise
  .bind({req, res})
  .then(() => model.find({deleted: true}))
  .then(response.OK)
  .catch(response.serverError)

// TODO: search into the content of the list
exports.getSearch = (req, res) => Promise
  .bind({req, res})
  .then(() => model.find(findByName(req.query.name)))
  .then(response.notFound)
  .then(response.OK)
  .catch(response.serverError)

exports.put = (req, res) => Promise
  .bind({req, res})
  .then(() => model.update(req.params.id, req.body))
  .then(response.OK)
  .catch(response.serverError)
