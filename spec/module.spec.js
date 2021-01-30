require('./setup')
var fount = require('../src/index.js')
var fauxdash = require('fauxdash')

describe('npm Dependencies', function () {
  describe('when require cache has dependency', function () {
    describe('with static dependency', function () {
      before(function () {
        fount.registerModule('fauxdash')
      })

      it('should successfully register as static', function () {
        return fount.resolve('fauxdash').should.eventually.equal(fauxdash)
      })
    })
    describe('with missing library', function () {
      it('should provide a meaningful error', function () {
        should.throw(function () {
          fount.resolve('wascally')
        }, 'Fount could not resolve the following dependencies: wascally')
      })
    })
  })

  describe('when require cache does not have dependency', function () {
    describe('with factory dependency', function () {
      before(function () {
        fount.registerModule('node-flakes')
      })

      it('should successfully register as factory', function () {
        return fount.resolve('node-flakes')
          .should.eventually.equal(require('node-flakes'))
      })
    })
    describe('with missing library', function () {
      it('should provide a meaningful error', function () {
        should.throw(function () {
          fount.resolve('wascally')
        }, 'Fount could not resolve the following dependencies: wascally')
      })
    })
  })
})
