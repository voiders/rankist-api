const test = require('ava')
const sinon = require('sinon')
const { expect } = require('chai')
const { created, OK, notFound, serverError } = require('../response')

const createContext = () => {
  const context = {
    res: {
      statusCode: 200,
      setHeader: sinon.spy(),
      status: function (status) {
        this.statusCode = status
        return this
      },
      json: sinon.spy()
    }
  }
  sinon.spy(context.res, 'status')
  return context
}

test('created should set 201 status and json header', t => {
  const context = createContext()
  const result = {}
  created.call(context, result)

  expect(context.res.statusCode).to.be.equal(201)
  expect(context.res.setHeader.calledWithExactly('Content-Type', 'application/json')).to.be.true
  expect(context.res.status.calledWithExactly(201)).to.be.true
  expect(context.res.json.calledWithExactly(result)).to.be.true
})

test('OK should set 200 status and json header', t => {
  const context = createContext()
  const result = {}
  OK.call(context, result)

  expect(context.res.statusCode).to.be.equal(200)
  expect(context.res.setHeader.calledWithExactly('Content-Type', 'application/json')).to.be.true
  expect(context.res.status.calledWithExactly(200)).to.be.true
  expect(context.res.json.calledWithExactly(result)).to.be.true
})

test('notFound should set 404 status and json header', t => {
  const context = createContext()
  notFound.call(context)

  expect(context.res.statusCode).to.be.equal(404)
  expect(context.res.setHeader.calledWithExactly('Content-Type', 'application/json')).to.be.true
  expect(context.res.status.calledWithExactly(404)).to.be.true
  expect(context.res.json.calledWithExactly({msg: 'not found'})).to.be.true
})

test('serverError should set 500 status and json header', t => {
  const context = createContext()
  const err = {}
  serverError.call(context, err)

  expect(context.res.statusCode).to.be.equal(500)
  expect(context.res.setHeader.calledWithExactly('Content-Type', 'application/json')).to.be.true
  expect(context.res.status.calledWithExactly(500)).to.be.true
  expect(context.res.json.calledWithExactly(err)).to.be.true
})
