const test = require('ava')
const { expect } = require('chai')
const { before, beforeEach, afterAlways } = require('../../utils/tests')

test.before.cb(before)
test.beforeEach(beforeEach)

test.after.always('drop db', afterAlways)

test.cb('get /api/anything/ 404', t => {
  t.context.req
    .get('/api/anything/')
    .set('Connection', 'keep-alive')
    .expect('Content-Type', /json/)
    .expect(404)
    .end(function (err, res) {
      expect(res.body.msg).to.be.equal('not found')
      expect(err).to.be.null
      t.end()
    })
})
