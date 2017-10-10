const test = require('ava')
const { expect } = require('chai')
const { before, beforeEach, afterAlways } = require('../../utils/tests')

test.before.cb(before)
test.beforeEach(beforeEach)

test.after.always('drop db', afterAlways)

test.cb('get /api/list/ 200', t => {
  t.context.req
    .get('/api/list/')
    .set('Connection', 'keep-alive')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      expect(res.body).empty
      expect(err).to.be.null
      t.end()
    })
})

test.cb('post /api/list/ 201', t => {
  t.context.req
    .post('/api/list/')
    .send({
      name: 'name test'
    })
    .set('Connection', 'keep-alive')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function (err, res) {
      expect(res.body.inserted).to.be.equal(1)
      expect(res.body.generated_keys).lengthOf(1)
      expect(res.body.generated_keys[0]).to.be.a('string')
      expect(err).to.be.null
      t.context.idList = res.body.generated_keys[0]
      t.end()
    })
})

let list

test.cb('get /api/list/search 200', t => {
  t.context.req
    .get('/api/list/search?name=test')
    .set('Connection', 'keep-alive')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      expect(res.body).to.have.lengthOf.at.least(1)
      expect(res.body[0].name).to.have.string('test')
      expect(res.body[0].deleted).to.be.false
      expect(res.body[0].id).to.be.a('string')
      expect(err).to.be.null
      list = res.body[0]
      t.end()
    })
})

test.cb('get /api/list/:id 200', t => {
  t.context.req
    .get('/api/list/' + list.id)
    .set('Connection', 'keep-alive')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      expect(res.body).to.be.deep.equal(list)
      expect(err).to.be.null
      t.end()
    })
})

test.cb('put /api/list/:id 200', t => {
  t.context.req
    .put('/api/list/' + list.id)
    .send({
      name: 'new name list'
    })
    .set('Connection', 'keep-alive')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      expect(res.body.replaced).to.be.equal(1)
      expect(err).to.be.null
      t.end()
    })
})

test.cb('get /api/list/:id 404', t => {
  t.context.req
    .get('/api/list/' + '12345-1234')
    .set('Connection', 'keep-alive')
    .expect('Content-Type', /json/)
    .expect(404)
    .end(function (err, res) {
      expect(res.body.msg).to.be.equal('not found')
      expect(err).to.be.null
      t.end()
    })
})
